import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Product from "../models/product.js";
import Order from "../models/orderModel.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order",protect, async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;

    for (const item of cartItems) {
      const qty = Number(item.qty);

      if (!Number.isInteger(qty) || qty < 1) {
        return res.status(400).json({
          message: "Invalid product quantity",
        });
      }

      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product.stock < qty) {
        return res.status(400).json({
          message: `${product.name} does not have enough stock`,
        });
      }

      total += product.price * qty;
    }

    if (!Number.isFinite(total) || total <= 0) {
      return res.status(400).json({
        message: "Invalid payment amount",
      });
    }

    const paymentOrder = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: "INR",
      receipt: `velora_${Date.now()}`,
    });

    return res.status(201).json({
      orderId: paymentOrder.id,
      amount: paymentOrder.amount,
      currency: paymentOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("RAZORPAY CREATE ORDER ERROR:", error.message);

    return res.status(500).json({
      message: "Could not create payment order",
    });
  }
});

// router.post("/verify-payment", protect, async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = req.body;

//     if (
//       !razorpay_order_id ||
//       !razorpay_payment_id ||
//       !razorpay_signature
//     ) {
//       return res.status(400).json({
//         message: "Missing payment verification details",
//       });
//     }

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         message: "Payment verification failed",
//       });
//     }

//     return res.status(200).json({
//       message: "Payment signature verified successfully",
//       paymentId: razorpay_payment_id,
//     });
//   } catch (error) {
//     console.error("PAYMENT VERIFICATION ERROR:", error.message);

//     return res.status(500).json({
//       message: "Payment verification failed",
//     });
//   }
// });

router.post("/verify-payment", protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
      shippingAddress,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !Array.isArray(cartItems) ||
      cartItems.length === 0 ||
      !shippingAddress
    ) {
      return res.status(400).json({
        message: "Missing payment or order details",
      });
    }
console.log("VERIFY PAYMENT ROUTE REACHED:", req.body);
    // 1. Verify the payment signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const signatureBuffer = Buffer.from(razorpay_signature, "hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");

    if (
      signatureBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }

    // 2. Confirm the payment with Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (
      payment.order_id !== razorpay_order_id ||
      payment.status !== "captured"
    ) {
      return res.status(400).json({
        message: "Payment has not been successfully captured",
      });
    }

    // 3. Prevent saving the same payment twice
    const existingOrder = await Order.findOne({
      paymentId: razorpay_payment_id,
    });

    if (existingOrder) {
      return res.status(200).json({
        message: "Order already saved",
        order: existingOrder,
      });
    }

    // 4. Recalculate the total using database prices
    let totalPrice = 0;
    const verifiedItems = [];

    for (const item of cartItems) {
      const qty = Number(item.qty);

      if (!Number.isInteger(qty) || qty < 1) {
        return res.status(400).json({
          message: "Invalid product quantity",
        });
      }

      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product.stock < qty) {
        return res.status(400).json({
          message: `${product.name} does not have enough stock`,
        });
      }

      totalPrice += product.price * qty;

      verifiedItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        qty,
      });
    }

    // 5. Ensure the captured amount matches the order total
    if (payment.amount !== Math.round(totalPrice * 100)) {
      return res.status(400).json({
        message: "Payment amount does not match the order total",
      });
    }

    // 6. Save the order
    const savedOrder = await Order.create({
      user: req.user._id,
      cartItems: verifiedItems,
      shippingAddress,
      totalPrice,
      status: "paid",
      paymentId: razorpay_payment_id,
    });
console.log("ORDER SAVED SUCCESSFULLY:", savedOrder._id);
    return res.status(201).json({
      message: "Payment verified and order saved successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("PAYMENT VERIFICATION ERROR:", error.message);

    return res.status(500).json({
      message: "Payment verification or order saving failed",
    });
  }
});

export default router;