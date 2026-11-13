// import Product from "../models/product.js";

// // ✅ GET ALL PRODUCTS
// export const getProducts = async (req, res) => {
//   try {
//     console.log("QUERY:", req.query);

//     const { search, category, minPrice, maxPrice, inStock, sort} = req.query;

//     let filter = {};

//     if (search) {
//       filter.name = {
//         $regex: search,
//         $options: "i",
//       };
//     }

//     if (category) {
//       filter.category = {
//     $regex: `^${category}$`,
//     $options: "i",
//   };
//     }

//     //   if (minPrice) {
//     //   filter.price = {
//     //     $gte: Number(minPrice),
//     //   };
//     // }

//     // // Filter by maximum price
//     // if (maxPrice) {
//     //   filter.price = {
//     //     ...filter.price,
//     //     $lte: Number(maxPrice),
//     //   };
//     // }

//     if (minPrice !== undefined && minPrice !== "") {
//   filter.price = {
//     ...filter.price,
//     $gte: Number(minPrice),
//   };
// }

// if (maxPrice !== undefined && maxPrice !== "") {
//   filter.price = {
//     ...filter.price,
//     $lte: Number(maxPrice),
//   };
// }

//     if (inStock === "true") {
//   filter.stock = {
//     $gt: 0,
//   };
// }
// let sortOption = {};

//     if (sort === "price_asc") {
//       sortOption.price = 1;
//     }

//     if (sort === "price_desc") {
//       sortOption.price = -1;
//     }

//     if (sort === "newest") {
//       sortOption.createdAt = -1;
//     }

//     console.log("FILTER:", filter);
//      console.log("SORT:", sortOption);
//     const products = await Product.find(filter).sort(sortOption);
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // ✅ GET SINGLE PRODUCT
// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({ message: "Product not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ CREATE PRODUCT (ADMIN)
// export const createProduct = async (req, res) => {
//   try {
//     const { name, price, description, stock, category, images} = req.body;
// if (
//   stock !== undefined &&
//   (stock === null ||
//     stock === "" ||
//     !Number.isFinite(Number(stock)) ||
//     Number(stock) < 0)
// ) {
//   return res.status(400).json({
//     message: "Stock must be a valid non-negative number",
//   });
// }

//     const product = new Product({
//       name,
//       price,
//       description,
//       stock
//       ,
//   category,
//   images,
//     });
// // if (stock !== undefined && (!Number.isFinite(Number(stock)) || Number(stock) < 0)) {
// //   return res.status(400).json({
// //     message: "Stock must be a valid non-negative number",
// //   });
// // }
//     const createdProduct = await product.save();
//     res.status(201).json(createdProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ UPDATE PRODUCT (ADMIN)
// // export const updateProduct = async (req, res) => {
// //   try {
// //      console.log("UPDATE PRODUCT CONTROLLER REACHED");
// //     console.log("RECEIVED STOCK:", req.body.stock);
// //     const product = await Product.findById(req.params.id);
// //     if (product) {
// //       product.name = req.body.name || product.name;
// //       product.price = req.body.price || product.price;
// //       product.description = req.body.description || product.description;
// //      if (req.body.stock !== undefined) {
// //       const stock = Number(req.body.stock);
// //         if ( req.body.stock === null ||
// //     req.body.stock === "" ||!Number.isFinite(stock) || stock < 0) {
// //     return res.status(400).json({
// //       message: "Stock must be a valid non-negative number",
// //     });
// //   }
// //   product.stock =stock;
// // }
// //       const updatedProduct = await product.save();
// //       res.json(updatedProduct);
// //     } else {
// //       res.status(404).json({ message: "Product not found" });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// export const updateProduct = async (req, res) => {
// try {
// console.log("UPDATE PRODUCT CONTROLLER REACHED");
// console.log("RECEIVED STOCK:", req.body.stock);

// const product = await Product.findById(req.params.id);

// if (!product) {
//   return res.status(404).json({
//     message: "Product not found",
//   });
// }

// // Update only fields included in the request
// if (req.body.name !== undefined) {
//   product.name = req.body.name;
// }

// if (req.body.price !== undefined) {
//   product.price = req.body.price;
// }

// if (req.body.description !== undefined) {
//   product.description = req.body.description;
// }

// if (req.body.category !== undefined) {
//   product.category = req.body.category;
// }

// if (req.body.images !== undefined) {
//   product.images = req.body.images;
// }

// // Validate stock before updating it
// if (req.body.stock !== undefined) {
//   const stock = Number(req.body.stock);

//   if (
//     req.body.stock === null ||
//     req.body.stock === "" ||
//     !Number.isFinite(stock) ||
//     stock < 0
//   ) {
//     return res.status(400).json({
//       message: "Stock must be a valid non-negative number",
//     });
//   }

//   product.stock = stock;
// }

// const updatedProduct = await product.save();

// res.json(updatedProduct);

// } catch (error) {
// res.status(500).json({
// message: error.message,
// });
// }
// };

// // ✅ DELETE PRODUCT (ADMIN)
// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       await product.deleteOne();
//       res.json({ message: "Product removed" });
//     } else {
//       res.status(404).json({ message: "Product not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };




// 



import Product from "../models/product.js";

// ✅ GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    console.log("QUERY:", req.query);

    const { search, category, minPrice, maxPrice, inStock, sort} = req.query;

    let filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = {
    $regex: `^${category}$`,
    $options: "i",
  };
    }

    if (minPrice !== undefined && minPrice !== "") {
  filter.price = {
    ...filter.price,
    $gte: Number(minPrice),
  };
}

if (maxPrice !== undefined && maxPrice !== "") {
  filter.price = {
    ...filter.price,
    $lte: Number(maxPrice),
  };
}

    if (inStock === "true") {
  filter.stock = {
    $gt: 0,
  };
}
let sortOption = {};

    if (sort === "price_asc") {
      sortOption.price = 1;
    }

    if (sort === "price_desc") {
      sortOption.price = -1;
    }

    if (sort === "newest") {
      sortOption.createdAt = -1;
    }

    console.log("FILTER:", filter);
     console.log("SORT:", sortOption);
    const products = await Product.find(filter).sort(sortOption);
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ CREATE PRODUCT (ADMIN)

export const createProduct = async (req, res) => {
  try {
    // Support both single product and product array
    const products = Array.isArray(req.body)
      ? req.body
      : [req.body];

    if (products.length === 0) {
      return res.status(400).json({
        message: "Product array cannot be empty",
      });
    }

    // Validate each product
    for (const product of products) {
      const { name, price, stock } = product;

      if (!name || price === undefined || price === null) {
        return res.status(400).json({
          message: "Product name and price are required",
        });
      }

      if (
        stock !== undefined &&
        (
          stock === null ||
          stock === "" ||
          !Number.isFinite(Number(stock)) ||
          Number(stock) < 0
        )
      ) {
        return res.status(400).json({
          message: `Invalid stock value for ${name}`,
        });
      }
    }

    // Insert multiple products into MongoDB
    const createdProducts = await Product.insertMany(products);

    res.status(201).json({
      success: true,
      message: "Products created successfully",
      totalProducts: createdProducts.length,
      products: createdProducts,
    });

  } catch (error) {
    console.error("Create Product Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};



// ✅ UPDATE PRODUCT (ADMIN)

export const updateProduct = async (req, res) => {
try {
console.log("UPDATE PRODUCT CONTROLLER REACHED");
console.log("RECEIVED STOCK:", req.body.stock);

const product = await Product.findById(req.params.id);

if (!product) {
  return res.status(404).json({
    message: "Product not found",
  });
}

// Update only fields included in the request
if (req.body.name !== undefined) {
  product.name = req.body.name;
}

if (req.body.price !== undefined) {
  product.price = req.body.price;
}

if (req.body.description !== undefined) {
  product.description = req.body.description;
}

if (req.body.category !== undefined) {
  product.category = req.body.category;
}

if (req.body.images !== undefined) {
  product.images = req.body.images;
}

// Validate stock before updating it
if (req.body.stock !== undefined) {
  const stock = Number(req.body.stock);

  if (
    req.body.stock === null ||
    req.body.stock === "" ||
    !Number.isFinite(stock) ||
    stock < 0
  ) {
    return res.status(400).json({
      message: "Stock must be a valid non-negative number",
    });
  }

  product.stock = stock;
}

const updatedProduct = await product.save();

res.json(updatedProduct);

} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// ✅ DELETE PRODUCT (ADMIN)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error){
    res.status(500).json({ message: error.message });
  }
};
