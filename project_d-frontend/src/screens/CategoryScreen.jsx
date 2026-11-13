import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard/ProductCard";
import "./CategoryScreen.css";
const collections = [
  "T-Shirts",
  "Shirts",
  "Jeans",
  "Hoodies",
  "Trousers",
  "Shorts",
  "Pants",
  "Sweatshirts",
  "Joggers",
  "Jackets",
];
const CategoryScreen = ({ addToCart }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [addedId, setAddedId] = useState(null);
  const [sort, setSort] = useState(() => {
    return localStorage.getItem("velora-sort") || "";
  });
  const [search, setSearch] = useState(() => {
    return localStorage.getItem("velora-search") || "";
  });
  const [sliderMin, setSliderMin] = useState(() => {
    const saved = localStorage.getItem("velora-price-min");
    return saved !== null ? Number(saved) : 0;
  });
  const [sliderMax, setSliderMax] = useState(() => {
    const saved = localStorage.getItem("velora-price-max");
    return saved !== null ? Number(saved) : 200000;
  });

  // Save existing filter preferences
  useEffect(() => {
    localStorage.setItem("velora-sort", sort);
    localStorage.setItem("velora-search", search);
    localStorage.setItem("velora-price-min", String(sliderMin));
    localStorage.setItem("velora-price-max", String(sliderMax));
  }, [sort, search, sliderMin, sliderMax]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products", {
          params: {
            sort,
            search,
            minPrice: sliderMin,
            maxPrice: sliderMax,
          },
        });

        setAllProducts(
          Array.isArray(data) ? data : data.products || []
        );
      } catch (error) {
        console.error("CATEGORY PRODUCTS ERROR:", error);
      }
    };

    fetchProducts();
  }, [sort, search, sliderMin, sliderMax]);

  // Fetch wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const storedUser = localStorage.getItem("userInfo");
        if (!storedUser) return;

        const userInfo = JSON.parse(storedUser);
        const userId = userInfo?.user?._id;

        if (!userId) return;

        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5000/wishlist/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const wishlistData = await response.json();

        const ids =
          wishlistData.products?.map(
            (product) => product._id
          ) || [];

        setWishlistIds(ids);
      } catch (error) {
        console.error("WISHLIST ERROR:", error);
      }
    };

    fetchWishlist();
  }, []);

  // Handle multiple collection selections
  const handleCollectionChange = (collection) => {
    setSelectedCollections((prev) =>
      prev.includes(collection)
        ? prev.filter((item) => item !== collection)
        : [...prev, collection]
    );
  };

  // Filter products by selected collections
  const filteredProducts = allProducts.filter((product) => {
    if (selectedCollections.length === 0) {
      return true;
    }

    return selectedCollections.some(
      (collection) =>
        collection.toLowerCase() ===
        product.category?.toLowerCase()
    );
  });

  const handleAddToCart = async (product) => {
  if (!addToCart) return;
  await addToCart(product);
  setAddedId(product._id);
  setTimeout(() => setAddedId(null), 1200);
};

  return (
    // <div className="category-page">

    //   <h1>Men's Collection</h1>
    //   <p>Explore our men's fashion collection.</p>

    //   {/* Search */}
    //   <input
    //     type="text"
    //     placeholder="Search products..."
    //     value={search}
    //     onChange={(e) => setSearch(e.target.value)}
    //   />

    //   {/* Collection Filters */}
    //   <div className="collection-filter">
    //     <h3>Filter by Collection</h3>

    //     <div className="collection-list">
    //       {collections.map((item) => (
    //         <label key={item} className="collection-option">
    //           <input
    //             type="checkbox"
    //             checked={selectedCollections.includes(item)}
    //             onChange={() => handleCollectionChange(item)}
    //           />
    //           {item}
    //         </label>
    //       ))}
    //     </div>

    //     <button
    //       type="button"
    //       onClick={() => setSelectedCollections([])}
    //     >
    //       Clear Collections
    //     </button>
    //   </div>

    //   {/* Sorting */}
    //   <div className="sort-filter">
    //     <label htmlFor="sort">Sort by:</label>

    //     <select
    //       id="sort"
    //       value={sort}
    //       onChange={(e) => setSort(e.target.value)}
    //     >
    //       <option value="">Default order</option>
    //       <option value="price_asc">Price: Low to High</option>
    //       <option value="price_desc">Price: High to Low</option>
    //       <option value="newest">Newest</option>
    //     </select>
    //   </div>

    //   {/* Price Slider */}
    //   <div className="price-slider">
    //     <p>
    //       Price range: ₹{sliderMin.toLocaleString("en-IN")}
    //       {" – "}
    //       ₹{sliderMax.toLocaleString("en-IN")}
    //     </p>

    //     <div className="dual-slider">
    //       <div className="slider-track" />

    //       <div
    //         className="slider-range"
    //         style={{
    //           left: `${(sliderMin / 200000) * 100}%`,
    //           width: `${((sliderMax - sliderMin) / 200000) * 100}%`,
    //         }}
    //       />

    //       <input
    //         className="dual-range min-range"
    //         type="range"
    //         min="0"
    //         max="200000"
    //         step="50"
    //         value={sliderMin}
    //         onChange={(e) =>
    //           setSliderMin(
    //             Math.min(Number(e.target.value), sliderMax)
    //           )
    //         }
    //       />

    //       <input
    //         className="dual-range max-range"
    //         type="range"
    //         min="0"
    //         max="200000"
    //         step="50"
    //         value={sliderMax}
    //         onChange={(e) =>
    //           setSliderMax(
    //             Math.max(Number(e.target.value), sliderMin)
    //           )
    //         }
    //       />
    //     </div>

    //     <div className="slider-labels">
    //       <span>₹0</span>
    //       <span>₹2,00,000</span>
    //     </div>

    //     <button
    //       type="button"
    //       onClick={() => {
    //         setSliderMin(0);
    //         setSliderMax(200000);
    //       }}
    //     >
    //       Reset price
    //     </button>
    //   </div>

    //   {/* Products */}
    //   <h2>Men's Products ({filteredProducts.length})</h2>

    //   <div className="product-grid">
    //     {filteredProducts.map((product) => (
    //       <ProductCard
    //         key={product._id}
    //         product={product}
    //         addToCart={addToCart}
    //         initialLiked={wishlistIds.includes(product._id)}
    //       />
    //     ))}
    //   </div>

    //   {filteredProducts.length === 0 && (
    //     <p>No products found in this collection.</p>
    //   )}

    // </div>
  
  <div className="category-page">
    <div className="category-heading">
      <h1>Men's Collection</h1>
      <p>Explore our men's fashion collection.</p>
    </div>

    <div className="category-layout">
      {/* LEFT SIDEBAR */}
      <aside className="filter-sidebar">
        <div className="filter-header">
          <h2>Filters</h2>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="collection-filter">
          <h3>Categories</h3>

          <div className="collection-list">
            {collections.map((item) => (
              <label key={item} className="collection-option">
                <input
                  type="checkbox"
                  checked={selectedCollections.includes(item)}
                  onChange={() => handleCollectionChange(item)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>

          <button
            type="button"
            className="filter-reset"
            onClick={() => setSelectedCollections([])}
          >
            Clear Categories
          </button>
        </div>

        {/* PRICE FILTER */}
        <div className="price-slider">
          <h3>Price Range</h3>

          <p>
            ₹{sliderMin.toLocaleString("en-IN")}
            {" – "}
            ₹{sliderMax.toLocaleString("en-IN")}
          </p>

          <div className="dual-slider">
            <div className="slider-track" />

            <div
              className="slider-range"
              style={{
                left: `${(sliderMin / 200000) * 100}%`,
                width: `${((sliderMax - sliderMin) / 200000) * 100}%`,
              }}
            />

            <input
              className="dual-range min-range"
              type="range"
              min="0"
              max="200000"
              step="50"
              value={sliderMin}
              aria-label="Minimum price"
              onChange={(e) =>
                setSliderMin(
                  Math.min(Number(e.target.value), sliderMax)
                )
              }
            />

            <input
              className="dual-range max-range"
              type="range"
              min="0"
              max="200000"
              step="50"
              value={sliderMax}
              aria-label="Maximum price"
              onChange={(e) =>
                setSliderMax(
                  Math.max(Number(e.target.value), sliderMin)
                )
              }
            />
          </div>

          <div className="slider-labels">
            <span>₹0</span>
            <span>₹2,00,000</span>
          </div>

          <button
            type="button"
            className="filter-reset"
            onClick={() => {
              setSliderMin(0);
              setSliderMax(200000);
            }}
          >
            Reset Price
          </button>
        </div>
      </aside>

      {/* RIGHT PRODUCT SECTION */}
      {/* <main className="category-products">
        <div className="products-toolbar">
          <h2>All Products ({filteredProducts.length})</h2>

          <div className="sort-filter">
            <label htmlFor="sort">Sort by:</label>

            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Default order</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
              initialLiked={wishlistIds.includes(product._id)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="no-products">
            No products found in this collection.
          </p>
        )}
      </main> */}
      <main className="category-products container py-4">
  {/* Toolbar with Heading & Sort Dropdown */}
  <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
    <h2 className="mb-0">All Products ({filteredProducts.length})</h2>

    <div className="d-flex align-items-center gap-2">
      <label htmlFor="sort" className="form-label mb-0 fw-semibold text-nowrap">
        Sort by:
      </label>

      <select
        id="sort"
        className="form-select form-select-sm"
        style={{ width: "auto" }}
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Default order</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  </div>

  {/* Matching Bootstrap Product Grid */}
  {filteredProducts.length > 0 ? (
    <div className="row g-4">
      {filteredProducts.map((product) => {
        const isAdded = addedId === product._id;

        return (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-4"
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
  ) : (
    <p className="text-center text-muted my-5">
      No products found in this collection.
    </p>
  )}
</main>

    </div>
  </div>

  );
};

export default CategoryScreen;