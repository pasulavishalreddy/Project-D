import Cart from "../models/cart.js";
import Order from "../models/orderModel.js";
import Product from "../models/product.js";

export const placeOrder = async (req, res) => {
  try {
    const { cartItems, shippingAddress } = req.body;

    // 1. Check whether the cart contains products
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2. Validate the shipping address
    if (
      !shippingAddress?.name?.trim() ||
      !shippingAddress?.address?.trim() ||
      !shippingAddress?.city?.trim() ||
      !shippingAddress?.postal?.trim()
    ) {
      return res.status(400).json({
        message: "Please provide all shipping address details",
      });
    }

    let total = 0;
    const orderItems = [];

    // 3. Verify each product using MongoDB data
    for (const item of cartItems) {
      if (!mongoose.Types.ObjectId.isValid(item._id)) {
        return res.status(400).json({
          message: "Invalid product ID",
        });
      }

      const qty = Number(item.qty);

      if (!Number.isInteger(qty) || qty < 1) {
        return res.status(400).json({
          message: "Product quantity must be a positive whole number",
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

      // 4. Use the database price, not the frontend price
      total += product.price * qty;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        qty,
      });
    }

    // 5. Save the verified order
    const order = await Order.create({
      user: req.user._id,
      cartItems: orderItems,
      shippingAddress,
      totalPrice: total,
    });

    return res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);

    return res.status(500).json({
      message: "Failed to place order",
    });
  }
};

// export const placeOrder = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user._id });

//     if (!cart || !cart.products || cart.products.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     // calculate total
//     let total = 0;
//     cart.products.forEach(item => {
//       total += item.quantity * 100; // temporary price logic
//     });

//     const order = await Order.create({
//       user: req.user._id,
//       orderItems: cart.products,
//       totalPrice: total,
//     });

//     // clear cart
//     cart.products = [];
//     await cart.save();

//     res.status(201).json(order);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// export const placeOrder = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user._id });

//     if (!cart || cart.products.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     let total = 0;
//     let orderItems = [];

//     for (const item of cart.products) {
//       const product = await Product.findById(item.product);

//       if (!product) continue;

//       // stock check
//       if (product.stock < item.quantity) {
//         return res.status(400).json({
//           message: `${product.name} out of stock`,
//         });
//       }

//       total += product.price * item.quantity;

//       orderItems.push({
//         product: product._id,
//         name: product.name,
//         price: product.price,
//         quantity: item.quantity,
//       });

//       // reduce stock
//       product.stock -= item.quantity;
//       await product.save();
//     }

//     const order = await Order.create({
//       user: req.user._id,
//       orderItems,
//       totalPrice: total,
//     });

//     // clear cart
//     cart.products = [];
//     await cart.save();

//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // make sure user only sees their order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};