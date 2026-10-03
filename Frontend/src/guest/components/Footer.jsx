import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">S</div>

            <div>
              <h3>ShuleBora</h3>
              <p>Empowering the Next Generation to Rise Up</p>
            </div>
          </div>

          <p className="footer-description">
            ShuleBora connects communities with schools,
            helping families discover better educational
            opportunities for the next generation.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>

          <Link to="/">Home</Link>
          <Link to="/schools">Schools</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>

          <Link to="/schools">Find Schools</Link>
          <Link to="/activities">School Activities</Link>
          <Link to="/get-started">Get Started</Link>
          <Link to="/login">Login</Link>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>

          <p>Zanzibar, Tanzania</p>
          <p>info@shulebora.com</p>
          <p>+255 000 000 000</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ShuleBora.
          All rights reserved.
        </p>

        <p>
          Empowering the Next Generation to Rise Up
        </p>
      </div>
    </footer>
  );
};

export default Footer;
