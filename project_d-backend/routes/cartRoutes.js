import express from "express";
import { addToCart,getCart,
  updateCartItem,
  removeCartItem, mergeCart} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/cart", protect, addToCart);

router.get("/cart", protect, getCart);

router.put("/cart/:productId", protect, updateCartItem);

router.delete("/cart/:productId", protect, removeCartItem);

router.post("/cart/merge", protect, mergeCart);

router.delete("/clear",protect,async(req,res)=>{
  try {
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $set: { products: [] } },
       { new: true }
       
    );
    console.log("CLEAR CART USER:", req.user._id);
    console.log("CART AFTER CLEAR:", cart);
    res.status(200).json({
      message: "Cart cleared successfully",
        cart,
    });
  } catch (error) {
    console.error("CLEAR CART ERROR:", error);
    return res.status(500).json({
      message: "Could not clear cart",
    });
  }
})

export default router;