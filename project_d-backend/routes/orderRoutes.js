import express from "express";
import Order from "../models/orderModel.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { placeOrder, getMyOrders, getOrderById } from "../controllers/orderController.js";
import { updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
                              .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("MY ORDERS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// router.post("/orders", protect, placeOrder);

router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // ✅ Make sure user only sees THEIR order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.json(order);
  } catch (error) {
    console.error("GET ORDER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { cartItems, shippingAddress, totalPrice } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const order = new Order({
      user: req.user._id,
      cartItems,
      shippingAddress,
      totalPrice,
      createdAt: new Date(),
    });
    const savedOrder = await order.save();
    console.log("ORDER SAVED:", savedOrder);
    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
// router.get("/orders/my", protect, getMyOrders);
// router.get("/order/:id", protect, getOrderById)
// router.put("/orders/:id/status", protect, admin, updateOrderStatus);

export default router;