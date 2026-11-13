// import React, { useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { products } from "./products";

// const ITEMS_PER_PAGE = 8;

// export default function ProductCatalog() {
//   // 2. Fallback ensures safeProducts is always an array even if import fails
//   const safeProducts = Array.isArray(products) ? products : [];

//   const [visibleProducts, setVisibleProducts] = useState(() =>
//     safeProducts.slice(0, ITEMS_PER_PAGE)
//   );
//   const [hasMore, setHasMore] = useState(
//     () => safeProducts.length > ITEMS_PER_PAGE
//   );

//   const fetchMoreData = () => {
//     setTimeout(() => {
//       const currentLength = visibleProducts.length;
//       const nextBatch = safeProducts.slice(
//         currentLength,
//         currentLength + ITEMS_PER_PAGE
//       );

//       setVisibleProducts((prev) => [...prev, ...nextBatch]);

//       if (currentLength + nextBatch.length >= safeProducts.length) {
//         setHasMore(false);
//       }
//     }, 400);
//   };

//   return (
//     <div className="container py-4">
//       <h2 className="mb-4">Our Products</h2>

//       <InfiniteScroll
//         // 3. Always resolves to a valid number (0 or greater)
//         dataLength={visibleProducts?.length ?? 0}
//         next={fetchMoreData}
//         hasMore={hasMore}
//         loader={
//           <div className="text-center my-4">
//             <div className="spinner-border text-dark" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         }
//         endMessage={
//           <p className="text-center text-muted my-4">
//             <b>You have seen all {safeProducts.length} products!</b>
//           </p>
//         }
//         style={{ overflow: "hidden" }}
//       >
//         <div className="row g-4">
//           {visibleProducts.map((product, index) => (
//             <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
//               <div className="card h-100 shadow-sm">
//                 <img
//                   src={product.image}
//                   className="card-img-top"
//                   alt={product.name}
//                   style={{ height: "260px", objectFit: "cover" }}
//                 />
//                 <div className="card-body d-flex flex-column">
//                   <div className="d-flex justify-content-between align-items-center mb-2">
//                     <span className="badge bg-secondary">
//                       {product.category}
//                     </span>
//                     <small
//                       className={
//                         product.stock > 0 ? "text-success" : "text-danger"
//                       }
//                     >
//                       {product.stock > 0
//                         ? `${product.stock} in stock`
//                         : "Out of stock"}
//                     </small>
//                   </div>

//                   <h5 className="card-title">{product.name}</h5>
//                   <p className="card-text text-muted small flex-grow-1">
//                     {product.description}
//                   </p>

//                   <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
//                     <span className="fw-bold fs-5">₹{product.price}</span>
//                     <button
//                       className="btn btn-dark btn-sm"
//                       disabled={product.stock === 0}
//                     >
//                       {product.stock > 0 ? "Add to Cart" : "Sold Out"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </InfiniteScroll>
//     </div>
//   );
// }



// 
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "../../services/api";
import './Infinite_scroll.css';

const ITEMS_PER_PAGE = 8;

export default function ProductCatalog({ addToCart }) {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  // Fetch products from your database just like HomeScreen
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        const safeProducts = Array.isArray(data) ? data : [];

        setAllProducts(safeProducts);
        setVisibleProducts(safeProducts.slice(0, ITEMS_PER_PAGE));
        setHasMore(safeProducts.length > ITEMS_PER_PAGE);
      } catch (error) {
        console.error("PRODUCT CATALOG FETCH ERROR:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const fetchMoreData = () => {
    setTimeout(() => {
      const currentLength = visibleProducts.length;
      const nextBatch = allProducts.slice(
        currentLength,
        currentLength + ITEMS_PER_PAGE
      );

      setVisibleProducts((prev) => [...prev, ...nextBatch]);

      if (currentLength + nextBatch.length >= allProducts.length) {
        setHasMore(false);
      }
    }, 400);
  };

  const handleAddToCart = async (product) => {
    if (!addToCart) {
      console.error("addToCart prop is missing in ProductCatalog");
      return;
    }

    // Product already has real MongoDB _id from API.get("/products")
    await addToCart(product);

    // Visual button confirmation
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1200);
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading products...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Our Products</h2>

      <InfiniteScroll
        dataLength={visibleProducts?.length ?? 0}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="text-center my-4">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
        endMessage={
          allProducts.length > 0 && (
            <p className="text-center text-muted my-4">
              <b>You have seen all {allProducts.length} products!</b>
            </p>
          )
        }
        style={{ overflow: "hidden" }}
      >
        <div className="row g-4">
          {visibleProducts.map((product) => {
            const isAdded = addedId === product._id;

            return (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={product._id}
              >
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "260px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-secondary">
                        {product.category}
                      </span>
                      <small
                        className={
                          product.stock > 0 ? "text-success" : "text-danger"
                        }
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </small>
                    </div>

                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted small flex-grow-1">
                      {product.description}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                      <span className="fw-bold fs-5">₹{product.price}</span>
                      <button
                        className={`btn btn-sm ${
                          isAdded ? "btn-success" : "btn-indigo"
                        }`}
                        disabled={product.stock === 0}
                        onClick={() => handleAddToCart(product)}
                      >
                        {product.stock === 0
                          ? "Sold Out"
                          : isAdded
                          ? "Added ✓"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
