import express from "express"
import {
    toggleWishlist,
    addToWishlist,
    getWishlist,
    removeFromWishlist
}from "../controllers/wishlistController.js";

const router =express.Router();

router.post("/toggle",toggleWishlist);

router.post("/add",addToWishlist);

router.get("/:userId",getWishlist);

router.delete("/remove",removeFromWishlist);

export default router;