
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiSearch
} from "react-icons/fi";

import "./Header.css";
import AboveHeader from "../AboveHeader/AboveHeader";

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
<div>
  <AboveHeader/>
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
          <Link to="/products-services">Products & Services</Link>
          {/* <Link to="/?category=women">WOMEN</Link>
          <Link to="/?category=kids">KIDS</Link> */}
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
    </div>
  );
};

export default Header;
