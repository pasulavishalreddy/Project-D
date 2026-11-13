// import { useNavigate, Link } from "react-router-dom";
// import "./Header.css";
// import Wishlist from "../../screens/wishlistScreen";
// import Profile from "../../Pages/Profile";
// const Header = ({ cart }) => {
//   const totalItems = (cart || []).reduce(
//     (acc, item) => acc + item.qty,
//     0
//   );
//   const logoutHandler = () => {
//     localStorage.removeItem("userInfo"); // ✅ remove token
//     window.location.href = "/login";     // ✅ redirect
//   };
//   const navigate = useNavigate();
//   return (
//     <header className="header">
//       <div className="header-container" style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#eee" }}>
//         <Link to="/" className="logo">
//           <h2>Velora</h2>
//         </Link>
//         <Link to="/cart" className="cart">
//           🛒 Cart  {totalItems > 0 && (
//             <span className="badge">{totalItems}</span>
//           )}
//         </Link>
//         <button onClick={() => navigate("/orders")}>
//           🧾 My Orders
//         </button>
//         <button onClick={() => navigate("/wishlist")}>
//           Go to Wishlist ❤️
//         </button>
//         <button onClick={logoutHandler}>
//           Logout
//         </button>
//         <button onClick={()=>{
//           navigate("/login")
//         }}> 
//           Login
//         </button>
//         <button onClick={()=>navigate("/profile")}>profile</button>
//       </div>
//     </header>
//   );
// };

// export default Header;/




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiSearch
} from "react-icons/fi";

import "./Header.css";

const Header = ({ cart = [] }) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);

  const totalItems = cart.reduce(
    (acc, item) => acc + Number(item.qty || 0),
    0
  );

  const isLoggedIn = Boolean(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(
        `/?search=${encodeURIComponent(search.trim())}`
      );
    }
  };

  return (
    <header className="header">
      <div className="header-container">

        {/* LOGO */}
        <Link to="/" className="logo">
          {/* Velora */}
          The Stylish Designer
        </Link>

        {/* CATEGORIES */}
        <nav className="nav-categories">
          {/* <Link to="/?category=men">MEN</Link> */}
          <Link to="/men">MEN</Link>
          <Link to="/?category=women">WOMEN</Link>
          <Link to="/?category=kids">KIDS</Link>
        </nav>

        {/* SEARCH BAR */}
        <form
          className="header-search"
          onSubmit={handleSearch}
        >
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit" aria-label="Search">
            <FiSearch />
          </button>
        </form>

        {/* HEADER ICONS */}
        <div className="header-actions">

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className="header-icon"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <FiHeart />
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            className="header-icon"
            aria-label="Cart"
            title="Cart"
          >
            <FiShoppingCart />

            {totalItems > 0 && (
              <span className="cart-badge">
                {totalItems}
              </span>
            )}
          </Link>

          {/* ACCOUNT */}
          <div className="account-menu">

            <button
              type="button"
              className="header-icon"
              aria-label="Account"
              aria-expanded={accountOpen}
              onClick={() =>
                setAccountOpen(!accountOpen)
              }
            >
              <FiUser />
            </button>

            {accountOpen && (
              <div className="account-dropdown">

                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() =>
                        navigate("/profile")
                      }
                    >
                      My Profile
                    </button>

                    <button
                      onClick={() =>
                        navigate("/orders")
                      }
                    >
                      My Orders
                    </button>

                    <button onClick={logoutHandler}>
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      navigate("/login")
                    }
                  >
                    Login
                  </button>

                  
                )}

              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
