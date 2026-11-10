import express from "express"
import Product from "../models/product.js";
import {protect,admin} from "../middleware/authMiddleware.js"
import {getProductById} from "../controllers/productController.js";
const router=express.Router()
// router.get("/products/:id", getProductById)
// router.post("/", protect,admin, async (req, res) => {
//     console.log("LOGGED USER:", req.user);
//     const product = await Product.create({
//         ...req.body,
//         user: req.user._id
//     });
//     res.json(product);
// });

// router.post("/products", protect, async (req,res)=>{
//     try{
//         const product= await Product.create(req.body);
//         res.json(product)
//     }catch(err){
//         res.status(500).json({message:err.message})
//     }
// })

// router.get("/products",async (req,res)=>{
//     try{
//         const product = await Product.find();
//         res.json(product);
//     }catch(err){
//         res.status(500).json({message:err.message})
//     }
// })

// router.put("/products/:id",protect,admin,async (req,res)=>{
//     try{
//         const product =await Product.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             {new:true}
//         )
//         if(!product){
//             return res.status(404).json({message:"task not found"})
//         }
//         res.json({
//             message:"Task updated succesdfully",
//             data:product
//         })
//     }catch(err){
//         res.status(500).json({message:err.message})
//     }
// });

router.delete("/products/:id", protect, admin,async (req,res)=>{
    try{
        const product=await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({message:"task not fOund"})
        }
        res.json({message:"Task deleted successfully"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

export default router;

