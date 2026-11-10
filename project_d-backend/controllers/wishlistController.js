import express from "express";
import mongoose from "mongoose";
import Wishlist from "../models/wishlist.js";

const router = express.Router();

export const toggleWishlist=async(req,res)=>{
  try {
    const { userId, productId } = req.body;

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        products: [productId]
      });
      await wishlist.save();
      return res.json({ added: true });
    }
    const exists = wishlist.products.find(
      (id) => id.toString() === productId
    );
    if (exists) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );
      await wishlist.save();
      return res.json({ added: false });
    } else {
      wishlist.products.unshift(productId);
      await wishlist.save();
      return res.json({ added: true });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const addToWishlist= async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log("BODY:", req.body);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        products: [productId]
      });
    } else {
      if (wishlist.products.some(id => id.toString() === productId)) {
        return res.json({ message: "Already added" });
      }
      wishlist.products.unshift(productId);
    }
    await wishlist.save();
    res.json({ message: "Added to wishlist", wishlist });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOne({ userId })
      .populate("products");

    res.json(wishlist || { products: [] });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const removeFromWishlist =  async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log("REMOVE REQUEST:", { userId, productId });

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "userId and productId are required",
      });
    }
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

        const productExists = wishlist.products.some(
      (id) => id.toString() === productId.toString()
    );

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist",
      });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId.toString()
    );

    await wishlist.save();
     console.log(
      "✅ UPDATED WISHLIST:",
      wishlist.products.map((id) => id.toString())
    );
       return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
    });

  } catch (error) {
    console.error("REMOVE WISHLIST ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export default router;

