import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";
export default function Footer() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    Aos.init({ duration: 1500, disable: "mobile", once: true });
  }, []);
  return (
    <footer ref={ref}>
      <div className="container" data-aos="fade-up">
        <div className="first-row">
          <div className="first-column">
            <h3 className="cera-logo">Cera</h3>
            <p className="first-column-text">
              At our online store, we believe that footwear and accessories are
              not just items to wear; they are expressions of style,
              personality, and functionality. We're passionate about providing
              you with a curated selection of shoes and bags that combine
              quality, comfort, and trendsetting designs.
            </p>
          </div>
          <div className="second-column">
            <h4 className="second-column-title">Company</h4>
            <ul>
              <li>
                <HashLink to="/#about">About</HashLink>
              </li>
              <li>
                <HashLink to="/#contact">Contact</HashLink>
              </li>
              <li>
                <HashLink to="/#collections">Collections</HashLink>
              </li>
            </ul>
          </div>
          <div className="third-column">
            <h4 className="third-column-title">Follow us</h4>
            <ul>
              <li>
                <a href="http://www.facebook.com">
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href="http://www.instagram.com">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="http://www.twitter.com">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="http://www.tiktok.com">
                  <FaTiktok />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="second-row">
          <p className="second-row-text">© 2024 Cera. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
