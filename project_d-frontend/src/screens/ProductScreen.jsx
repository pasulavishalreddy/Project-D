import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "./ProductScreen.css"
const ProductScreen = ({ addToCart }) =>{
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchProduct = async () =>{
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    }
    fetchProduct();
  }, [id]);
//   const addToFavorites = async (item) => {
//   await fetch("http://localhost:5000/api/favorites/add", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       userId: "123", 
//       product: item
//     })
//   });
// };
  return (
    <div className="product-screen">
      <div className="product-container">
       <div className="product-left">
  {product.images?.map((image, index) => (
    <img
      key={index}
      src={image}
      alt={`${product.name} ${index + 1}`}
      className="product-main-image"
    />
  ))}
</div>
        <div className="product-right">
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">₹{product.price}</p>
      <p className="product-desc">{product.description}</p>
      <button className="add-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
      </div>
    </div>
    </div>
  );
};

export default ProductScreen;