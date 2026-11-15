
import React from "react";
import { Link } from "react-router-dom";
import { PawPrint, Heart, ArrowUp } from "lucide-react";
import "./footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-content">

          {/* BRAND SECTION */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <PawPrint size={30} />

              <h2>Pet <span>Heaven</span></h2>
            </Link>

            <p>
              Every pet deserves a loving home. At Pet Heaven, we connect loving 
              families with furry companions waiting for their forever homes.
            </p>

            <div className="footer-message">
              <Heart size={16} />
              <span>Adopt Love. Give Hope.</span>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>

            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>

              <li>
                <Link to="/adoption">Adopt a Pet</Link>
              </li>

              <li>
                <Link to="/services">Our Services</Link>
              </li>

              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Get Involved</h3>

            <ul>
              <li>
                <Link to="/adoption">Find a Companion</Link>
              </li>

              <li>
                <Link to="/services">Rehome a Pet</Link>
              </li>

              <li>
                <Link to="/signup">Join Our Community</Link>
              </li>
            </ul>
          </div>

          <div className="footer-about">
            <h3>Our Purpose</h3>

            <p>
              Creating second chances and happier beginnings 
              for pets in need of loving homes.
            </p>

            <Link to="/aboutus" className="footer-about-link">Learn More →</Link>
          </div>

        </div>

        <div className="footer-bottom">

          <p>© {new Date().getFullYear()} Pet Heaven.All Rights Reserved.</p>

          <div className="footer-bottom-right">
            <span>Made with <Heart size={14} /> for pets</span>

            <button
              type="button"
              className="footer-top-btn"
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
