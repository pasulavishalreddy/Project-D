// import "./CartScreen.css"
// import { useNavigate } from "react-router-dom";

// const CartScreen = ({ cart, addToCart, removeFromCart, decreaseQty }) => {
//   const totalPrice = cart.reduce(
//     (acc, item) => acc + item.price * item.qty,
//     0
//   );
//   const navigate = useNavigate();
//   return (
//     <div className="cart-screen">
//       <h2 className="cart-title">Your Cart</h2>
//       {cart.length === 0 ? (
//         <p className="empty-cart">Cart is empty</p>
//       ) : (
//         <>
//           <div className="cart-container">
//             {cart.map((item) => (
//               <div key={item._id} className="cart-item">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="cart-image"
//                 />
//                 <div className="cart-details">
//                   <h3>{item.name}</h3>
//                   <p>₹{item.price}</p>
//                 </div>
//                 <div className="cart-qty">
//                   <button onClick={() => decreaseQty(item._id)}>-</button>
//                   <span>{item.qty}</span>
//                   <button onClick={() => addToCart(item)}>+</button>
//                 </div>
//                 <button
//                   className="remove-btn"
//                   onClick={() => removeFromCart(item._id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//           <div className="cart-summary">
//             <h3>Total: ₹{totalPrice}</h3>
//             <button
//               className="checkout-btn"
//               onClick={() => navigate("/checkout")}
//             >
//               Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
// export default CartScreen;



import "./CartScreen.css"
import { useNavigate } from "react-router-dom";

const CartScreen = ({ cart, addToCart, removeFromCart, decreaseQty }) => {
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const navigate = useNavigate();
  return (
    <div className="cart-screen">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Cart is empty</p>
      ) : (
        <>
          <div className="cart-container">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                {/* <img
                  src={item.image}
                  alt={item.name}
                  className="cart-image"
                /> */}
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                </div>
                <div className="cart-qty">
                  <button onClick={() => decreaseQty(item._id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ₹{totalPrice}</h3>
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default CartScreen;