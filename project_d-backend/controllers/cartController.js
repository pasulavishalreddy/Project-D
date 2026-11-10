import Cart from "../models/cart.js";
import Product from "../models/product.js";

export const addToCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        products: [],
      });
    }

    const existingProduct = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += Number(quantity);
    } else {
      cart.products= [
    {
      product: productId,
      quantity: Number(quantity),
    },
    ...cart.products,
  ];
    }

//     console.log(
//   "BEFORE SAVE:",
//   cart.products.map((item) => ({
//     productId: item.product.toString(),
//   }))
// );

    await cart.save();

//     console.log(
//   "AFTER SAVE:",
//   cart.products.map((item) => ({
//     productId: item.product.toString(),
//   }))
// );

    const updatedCart = await Cart.findById(cart._id)
      .populate("products.product");

    res.status(200).json({
      message: "Product added to cart",
      cart: updatedCart,
    });

  } catch (error) {
    console.error("ADD TO CART ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("products.product");

    if (!cart) {
      return res.status(200).json({
        cart: {
          products: [],
        },
      });
    }
    res.status(200).json({
      cart,
    });

  } catch (error) {
    console.error("GET CART ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    if (quantity <= 0) {
      cart.products = cart.products.filter(
        (item) => item.product.toString() !== productId
      );
    } else {
      item.quantity = quantity;
    }
    await cart.save();
    const updatedCart = await Cart.findById(cart._id)
      .populate("products.product");

//       console.log(
//   "FINAL CART ORDER:",
//   updatedCart.products.map(item => ({
//     productId: item.product?._id,
//     name: item.product?.name
//   }))
// );

    res.status(200).json({
      message: "Cart updated",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("UPDATE CART ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    if (!req.user){
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

  const updatedCart = await Cart.findById(cart._id)
      .populate("products.product");
    res.status(200).json({
      message: "Product removed from cart",
      cart: updatedCart,
    });

  } catch (error) {
    console.error("REMOVE CART ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const mergeCart= async(req,res)=>{
  try{
    if(!req.user){
      return res.status(401).json({
        message:"User not authenticated"
      })
    }
    const {products}=req.body;
    if(!Array.isArray(products)){
      return res.status(400).json({
        message:"Invalid cart data"
      })
    }

    let cart =await Cart.findOne({
      user:req.user._id,
    })

    if(!cart){
      cart=new Cart({
        user:req.user._id,
        products:[]
      });
    }

for(const guestItem of products){
  const {productId,quantity}=guestItem;
  if(!productId || quantity<=0){
    continue;
  }
  
  const product= await Product.findById(productId);
  if(!product){
    continue;
  } 

  const existingProduct = cart.products.find(
    (item)=> item.product.toString() === productId.toString() 
  );
     if (existingProduct) {
        existingProduct.quantity += Number(quantity);
      } else {
        cart.products.unshift({
          product: productId,
          quantity: Number(quantity),
        });
      }
}
   await cart.save();

  const updatedCart = await Cart.findById(cart._id)
    .populate("products.product");

    res.status(200).json({
      message: "Guest cart merged successfully",
      cart: updatedCart,
    });

  }
   catch (error) {
    console.error("MERGE CART ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
}