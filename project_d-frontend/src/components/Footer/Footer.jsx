import React from "react";
import { Link } from "react-router-dom"; // Replace with <a> if not using React Router

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row g-4">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold text-uppercase mb-3">The Stylish Designer</h5>
            <p className="text-secondary small">
              Everyday essentials and modern streetwear crafted for comfort and
              style. Quality fabrics delivered straight to your doorstep.
            </p>
            <p className="text-secondary small mb-1">
              <strong>Email:</strong> support@yourbrand.com
            </p>
            <p className="text-secondary small mb-0">
              <strong>Phone:</strong> +91 98765 43210
            </p>
          </div>

          {/* Shop Categories */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-semibold text-uppercase mb-3">Shop</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/products?category=T-Shirts" className="text-secondary text-decoration-none">
                  T-Shirts
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products?category=Shirts" className="text-secondary text-decoration-none">
                  Shirts
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products?category=Hoodies" className="text-secondary text-decoration-none">
                  Hoodies & Sweatshirts
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products?category=Bottoms" className="text-secondary text-decoration-none">
                  Jeans & Trousers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-semibold text-uppercase mb-3">Customer Care</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/profile" className="text-secondary text-decoration-none">
                  My Account
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/orders" className="text-secondary text-decoration-none">
                  Track Order
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/returns" className="text-secondary text-decoration-none">
                  Returns & Exchanges
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/size-guide" className="text-secondary text-decoration-none">
                  Size Guide
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-secondary text-decoration-none">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-semibold text-uppercase mb-3">Stay Updated</h6>
            <p className="text-secondary small">
              Subscribe for new drops, exclusive offers, and style updates.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed!");
              }}
            >
              <div className="input-group input-group-sm mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
                <button className="btn btn-primary" type="submit">
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        {/* Bottom Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small text-secondary">
          <p className="mb-2 mb-md-0">
            &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>
          <div className="d-flex gap-3">
            <Link to="/privacy-policy" className="text-secondary text-decoration-none">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-secondary text-decoration-none">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
