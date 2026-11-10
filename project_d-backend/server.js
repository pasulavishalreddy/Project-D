import express from "express";
import cors from "cors";
// import dotenv from "dotenv"
import "dotenv/config";
import router from "./routes/route.js";
import connectDB from './config/db.js'
import authRoutes from "./routes/auth.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import wishlistRoutes from "./routes/wishlistRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
// dotenv.config()
const app = express()
app.use(cors());
connectDB()
app.use(express.json());
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.originalUrl);
  next();
});
app.use("/auth",authRoutes)
app.use("/",router)
app.use("/",cartRoutes)
app.use("/orders",orderRoutes);
app.use("/",productRoutes)
app.use("/wishlist", wishlistRoutes);
app.use("/payments",paymentRoutes);
const PORT= process.env.PORT||5000
app.listen(PORT, ()=>{
    console.log("server running in 5000")
})



