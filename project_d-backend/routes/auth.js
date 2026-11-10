import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/authMiddleware.js";
const  router = express.Router();
router.post("/register",async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const userExists=await User.findOne({email});
        console.log("Auth routes loaded");
        if (userExists){
            return res.status(400).json({message:"user already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user =await User.create({
            name,
            email,
            password:hashedPassword
        })
        res.json(user);
    }catch(err){
        res.status(500).json({message:err.message})
    }
});

router.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Password"})
        }

        const token =jwt.sign(
            {id:user._id},
            "secretkey",
            {expiresIn:"7d"}
        );
        res.json({
            token,
            user
        });
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

router.put("/change-password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/profile",protect,async (req, res) => {
    console.log("PROFILE ROUTE HIT");
    console.log("USER:", req.user);
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/addresses", protect, async (req, res) => {
  try {
    const {
      label,
      fullName,
      phone,
      addressLine,
      city,
      state,
      pincode,
      country,
    } = req.body;

    if (
      !label ||
      !fullName ||
      !phone ||
      !addressLine ||
      !city ||
      !state ||
      !pincode ||
      !country
    ) {
      return res.status(400).json({
        message: "All address fields are required",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isFirstAddress = user.addresses.length === 0;

    user.addresses.push({
      label,
      fullName,
      phone,
      addressLine,
      city,
      state,
      pincode,
      country,
      isDefault: isFirstAddress,
    });

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    res.status(201).json({
      message: "Address added successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("ADD ADDRESS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/addresses", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("addresses");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({  
      addresses: user.addresses,
    });
    console.log("Address:", req.user);
  } catch (error) {
    console.error("GET ADDRESSES ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});


router.put("/addresses/:addressId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const address = user.addresses.id(req.params.addressId);

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    const {
      label,
      fullName,
      phone,
      addressLine,
      city,
      state,
      pincode,
      country,
    } = req.body;

    if (
      !label ||
      !fullName ||
      !phone ||
      !addressLine ||
      !city ||
      !state ||
      !pincode ||
      !country
    ) {
      return res.status(400).json({
        message: "All address fields are required",
      });
    }

    address.label = label;
    address.fullName = fullName;
    address.phone = phone;
    address.addressLine = addressLine;
    address.city = city;
    address.state = state;
    address.pincode = pincode;
    address.country = country;

    await user.save();

    res.status(200).json({
      message: "Address updated successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("UPDATE ADDRESS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});


router.put("/addresses/:addressId/default",protect,
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const address = user.addresses.id(req.params.addressId);

      if (!address) {
        return res.status(404).json({
          message: "Address not found",
        });
      }

      user.addresses.forEach((item) => {
        item.isDefault = false;
      });

      address.isDefault = true;

      await user.save();

      res.status(200).json({
        message: "Default address updated",
        addresses: user.addresses,
      });
    }catch (error){
      console.error("SET DEFAULT ADDRESS ERROR:", error);
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.delete("/addresses/:addressId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const address = user.addresses.id(req.params.addressId);

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    const wasDefault = address.isDefault;

    address.deleteOne();

    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();

    res.status(200).json({
      message: "Address deleted successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("DELETE ADDRESS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;

