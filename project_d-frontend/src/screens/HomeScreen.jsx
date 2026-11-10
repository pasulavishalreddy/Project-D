import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import "./HomeScreen.css"
const HomeScreen = ({ addToCart }) => {
  const [value, setValue] = useState(0);
const [products, setProducts] = useState([]);
const [wishlistIds, setWishlistIds] = useState([]);
const [sort, setSort] = useState(() => {
  return localStorage.getItem("velora-sort") || "";
});
const [search, setSearch] = useState(() => {
  return localStorage.getItem("velora-search") || "";
});
const [category, setCategory] = useState(() => {
  return localStorage.getItem("velora-category") || "";
});
const [sliderMin, setSliderMin] = useState(() => {
  const saved = localStorage.getItem("velora-price-min");
  return saved !== null ? Number(saved) : 0;
});

// const [sliderMin, setSliderMin] = useState(0);
const [sliderMax, setSliderMax] = useState(() => {
  const saved = localStorage.getItem("velora-price-max");
  return saved !== null ? Number(saved) : 200000;
});
// const [sliderMax, setSliderMax] = useState(2000000);
       useEffect(() => {
  localStorage.setItem("velora-price-min", String(sliderMin));
  localStorage.setItem("velora-price-max", String(sliderMax));
}, [sliderMin, sliderMax]);
useEffect(() => {
  localStorage.setItem("velora-sort", sort);
  localStorage.setItem("velora-search", search);
  localStorage.setItem("velora-category", category);
}, [sort, search, category]);
 useEffect(() => {
    const fetchProducts = async () => {
      try{
        console.log("Selected sort:", sort);
        console.log("ALL FILTERS:", {
  sort,
  search,
  category,
  sliderMin,
  sliderMax,
});
    const { data } = await API.get ("/products",{
      params: {
      sort: sort,
      search: search,
      category:category,
      minPrice: sliderMin,
      maxPrice: sliderMax,
     },
      });
      setProducts(data);
      const storedUser =
          localStorage.getItem("userInfo");
        if (!storedUser) {
          return;
        }
        const userInfo = JSON.parse(storedUser);
        const userId = userInfo?.user?._id;
        if (!userId) {
          return;
        }

        // =========================
        // GET WISHLIST
        // =========================

        const token =
          localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5000/wishlist/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const wishlistData =
          await response.json();
        console.log(
          "❤️ USER WISHLIST:",
          wishlistData
        );
        const ids =
          wishlistData.products?.map(
            (product) => product._id
          ) || [];
        setWishlistIds(ids)
      } catch (error) {
        console.error(
          "HOME DATA ERROR:",
          error
        );
      }
    };
    fetchProducts();
  }, [sort,search,category,sliderMin,sliderMax]);
  return (
    <div>
      <input
  type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<label htmlFor="category">Category:</label>
<select
  id="category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">All Categories</option>
  <option value="Electronics">Electronics</option>
  <option value="clothing">Fashion</option>
  <option value="kitchen">Kitchen</option>
  <option value="sports">sports</option>
</select>
      <h2>Products</h2>
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

{/* <div className="price-slider">
  <p>Maximum price: ₹{sliderMax}</p>

  <label htmlFor="sliderMax">Adjust maximum price</label>
 <input
  id="sliderMax"
  type="range"
  min="0"
  max="200000"
  step="50"
  value={sliderMax}
  onChange={(e) => setSliderMax(Number(e.target.value))}
/>
</div> */}


{/* <div className="price-slider">
  <p>
    Price range: ₹{sliderMin.toLocaleString("en-IN")}
    {" – "}
    ₹{sliderMax.toLocaleString("en-IN")}
  </p>

  <div className="price-slider-track">
    <input
      className="range-input range-input-min"
      type="range"
      aria-label="Minimum price"
      min="0"
      max="200000"
      step="50"
      value={sliderMin}
      onChange={(e) => {
        const value = Number(e.target.value);
        setSliderMin(Math.min(value, sliderMax));
      }}
    />

    <input
      className="range-input range-input-max"
      type="range"
      aria-label="Maximum price"
      min="0"
      max="200000"
      step="50"
      value={sliderMax}
      onChange={(e) => {
        const value = Number(e.target.value);
        setSliderMax(Math.max(value, sliderMin));
      }}
    />
  </div>

  <button
    type="button"
    onClick={() => {
      setSliderMin(0);
      setSliderMax(200000);
    }}
  >
    Reset price
  </button>
</div> */}


<div className="price-slider">
  <p>
    Price range: ₹{sliderMin.toLocaleString("en-IN")}
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
      aria-label="Minimum price"
      min="0"
      max="200000"
      step="50"
      value={sliderMin}
      onChange={(e) => {
        setSliderMin(
          Math.min(Number(e.target.value), sliderMax)
        );
      }}
    />

    <input
      className="dual-range max-range"
      type="range"
      aria-label="Maximum price"
      min="0"
      max="200000"
      step="50"
      value={sliderMax}
      onChange={(e) => {
        setSliderMax(
          Math.max(Number(e.target.value), sliderMin)
        );
      }}
    />
  </div>

  <div className="slider-labels">
    <span>₹0</span>
    <span>₹2,00,000</span>
  </div>

  <button
    type="button"
    onClick={() => {
      setSliderMin(0);
      setSliderMax(200000);
    }}
  >
    Reset price
  </button>
</div>




{/* <div className="price-filter">
  <label htmlFor="minPrice">Min Price:</label>
  <input
    id="minPrice"
    type="number"
    placeholder="Min price"
    min="0"
   value={sliderMin}
onChange={(e) => {
  const value = Number(e.target.value);
  setSliderMin(Math.min(value, sliderMax));
}}
  />
  <label htmlFor="maxPrice">Max Price:</label>
  <input
    id="maxPrice"
    type="number"
    placeholder="Max price"
    min="0"
   value={sliderMax}
onChange={(e) => {
  const value = Number(e.target.value);
  setSliderMax(Math.max(value, sliderMin));
}}
  />
</div> */}

</div>
      {/* <Link to="/cart">Go to Cart</Link> */}
      <div className="product-grid">
       {products.map((product) => {
          // Check whether this product
          // already exists in wishlist
          const isLiked =
            wishlistIds.includes(product._id);
          return (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
              initialLiked={isLiked}
            />
          );
        })}
      </div>
    </div>
  );
};
export default HomeScreen;