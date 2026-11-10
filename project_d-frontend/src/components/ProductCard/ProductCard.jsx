import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
 import { FaHeart } from "react-icons/fa";
import { useState ,useEffect} from "react";
import "./ProductCard.css";

const ProductCard = ({ product, addToCart,initialLiked = false }) => {
const [liked, setLiked] = useState(false);
const [Loading, setLoading]=useState(false);
useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);
const addToWishlist = async (e) => {
  e?.preventDefault();
    // setLiked(prevLiked => !prevLiked); 
    // if (loading) return;
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const userId = userInfo?.user?._id;
      if (!userId) {
        alert("User not logged in");
        return;
      }
      const previousState = liked;
    // setLiked(!previousState);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/wishlist/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userId,
          productId: product._id
        })
      });
      const data = await res.json();
      console.log("Backend response:", data);
      if (!res.ok) {
        throw new Error(data.message || "Failed to toggle wishlist");
      }
if (typeof data.added === "boolean") {
        setLiked(data.added);
      } else if (typeof data.isLiked === "boolean") {
        setLiked(data.isLiked);
      }else if (Array.isArray(data.wishlist)) {
        // If backend returns the updated wishlist array of IDs/objects
        const isPresent = data.wishlist.some(
          item =>(item._id ? item._id.toString() : item.toString()) === product._id.toString()
        );
        setLiked(isPresent);
      }
      // setLiked(data.added);
    }catch (err){
      console.error("Wishlist error:", err);
      // Revert if API request failed
      setLiked(previousState);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <Link to={`/product/${product._id}`}>
        <h3 className="product-title">{product.name}</h3>
      </Link>
      <p className="product-price">₹{product.price}</p>
      <button className="add-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
      <button className="wish-btn" onClick={addToWishlist}>
        {liked ? <FaHeart />  : <FaRegHeart /> }
      </button>
    </div>
  );
};

export default ProductCard;