import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* LOGO */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <span className="logo-icon">S</span>

          <span className="logo-text">
            Shule<span>Bora</span>
          </span>
        </Link>


        {/* NAVIGATION */}
        <nav
          className={`navbar-menu ${
            menuOpen ? "active" : ""
          }`}
        >

          <Link
            to="/"
            className={`nav-link ${isActive("/")}`}
            onClick={closeMenu}
          >
            Home
          </Link>


          <Link
            to="/schools"
            className={`nav-link ${isActive("/schools")}`}
            onClick={closeMenu}
          >
            Schools
          </Link>


          <Link
            to="/activities"
            className={`nav-link ${isActive("/activities")}`}
            onClick={closeMenu}
          >
            Activities
          </Link>


          <Link
            to="/about"
            className={`nav-link ${isActive("/about")}`}
            onClick={closeMenu}
          >
            About Us
          </Link>


          <Link
            to="/contact"
            className={`nav-link ${isActive("/contact")}`}
            onClick={closeMenu}
          >
            Contact
          </Link>


          {/* MOBILE BUTTONS */}
          <div className="navbar-mobile-actions">

            <Link
              to="/login"
              className="nav-login"
              onClick={closeMenu}
            >
              Login
            </Link>

            <Link
              to="/get-started"
              className="nav-register"
              onClick={closeMenu}
            >
              Get Started
            </Link>

          </div>

        </nav>


        {/* DESKTOP BUTTONS */}
        <div className="navbar-actions">

          <Link
            to="/login"
            className="nav-login"
            onClick={closeMenu}
          >
            Login
          </Link>


          <Link
            to="/get-started"
            className="nav-register"
            onClick={closeMenu}
          >
            Get Started
          </Link>

        </div>


        {/* MOBILE MENU */}
        <button
          type="button"
          className={`mobile-menu-btn ${
            menuOpen ? "open" : ""
          }`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

    </header>
  );
};

export default Navbar;
