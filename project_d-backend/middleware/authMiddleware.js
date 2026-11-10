import jwt from "jsonwebtoken";
import User from "../models/user.js";
const protect=async (req,res,next)=>{
    let token;
    if(req.headers.authorization 
        && req.headers.authorization.startsWith("Bearer")){
        try{
            console.log("HEADERS:", req.headers)
            // console.log("AUTH:", req.headers.authorization);
            token =req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,"secretkey")
            console.log("DECODED:", decoded);
            req.user= await User.findById(decoded.id).select("-password");
            console.log("AUTH USER:", req.user);
            console.log("AUTH USER ID:", req.user?._id);
console.log("AUTH USER PHONE:", req.user?.phone);
console.log("AUTH USER ADDRESSES:", req.user?.addresses);
               if (!req.user) {
        return res.status(401).json({
          message: "User not found",
        });
      }
        next()
        }catch(err){
            console.log("ERROR:", err.message);
            return res.status(401).json({
                message:"Not authorized, token failed"
            })
        }
        
    } 
    else{
            return res.status(401).json({
                message:"Not token, authorized denied"
            })
        }
}
const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    }else {
        res.status(403).json({ message: "Admin only access" });
    }
};

export {protect,admin}