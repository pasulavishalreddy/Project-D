import { useNavigate, Link } from "react-router-dom";
import "./Header.css";
import Wishlist from "../../screens/wishlistScreen";
import Profile from "../../Pages/Profile";
const Header = ({ cart }) => {
  const totalItems = (cart || []).reduce(
    (acc, item) => acc + item.qty,
    0
  );
  const logoutHandler = () => {
    localStorage.removeItem("userInfo"); // ✅ remove token
    window.location.href = "/login";     // ✅ redirect
  };
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-container" style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#eee" }}>
        <Link to="/" className="logo">
          <h2>Velora</h2>
        </Link>
        <Link to="/cart" className="cart">
          🛒 Cart  {totalItems > 0 && (
            <span className="badge">{totalItems}</span>
          )}
        </Link>
        <button onClick={() => navigate("/orders")}>
          🧾 My Orders
        </button>
        <button onClick={() => navigate("/wishlist")}>
          Go to Wishlist ❤️
        </button>
        <button onClick={logoutHandler}>
          Logout
        </button>
        <button onClick={()=>{
          navigate("/login")
        }}> 
          Login
        </button>
        <button onClick={()=>navigate("/profile")}>profile</button>
      </div>
    </header>
  );
};

export default Header;