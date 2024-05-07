import { Link } from "react-router-dom";
import { NavHashLink, HashLink } from "react-router-hash-link";
import Hamburger from "hamburger-react";
import CartIcon from "./CartIcon";
import FavouriteIcon from "./FavouriteIcon";
import Aos from "aos";
import "aos/dist/aos.css";
import React from "react";
export default function Header(props) {
  const [hashes, setHashes] = React.useState({
    home: "work",
    about: "not-work",
    collections: "not-work",
    contact: "not-work",
  });
  const [isOpen, setOpen] = React.useState(false);
  const className = isOpen ? "show" : "hidden";

  function closeMenu() {
    if (isOpen) {
      setOpen(false);
    }
  }
  React.useEffect(() => {
    Aos.init({ duration: 1500, disable: "mobile", once: true });
  }, []);
  function makeActive(section) {
    if (section === "home") {
      setHashes({
        home: "work",
        about: "not-work",
        collections: "not-work",
        contact: "not-work",
      });
    } else if (section === "about") {
      setHashes({
        home: "not-work",
        about: "work",
        collections: "not-work",
        contact: "not-work",
      });
    } else if (section === "collections") {
      setHashes({
        home: "not-work",
        about: "not-work",
        collections: "work",
        contact: "not-work",
      });
    } else if (section === "contact") {
      setHashes({
        home: "not-work",
        about: "not-work",
        collections: "not-work",
        contact: "work",
      });
    }
  }
  return (
    <header onClick={closeMenu} data-aos="fade-down">
      <div className="container">
        <nav className="navbar">
          <div className="logo-container">
            <HashLink to="Cera-Store/" className="logo">
              Cera
            </HashLink>
          </div>
          <div className="burger-icon-container">
            <div className="burger-icon">
              <Hamburger
                toggled={isOpen}
                toggle={setOpen}
                size={22}
                className="hamburger-icon"
                rounded
                label="Show menu"
                color="#40485E"
              />
            </div>
            <div className={`nav-links ${className}`}>
              <NavHashLink
                className={hashes.home}
                onClick={() => makeActive("home")}
                smooth
                to="/"
              >
                Home
              </NavHashLink>
              <NavHashLink
                className={hashes.about}
                onClick={() => makeActive("about")}
                smooth
                to="/#about"
              >
                About
              </NavHashLink>
              <NavHashLink
                className={hashes.collections}
                onClick={() => makeActive("collections")}
                smooth
                to="/#collections"
              >
                Collections
              </NavHashLink>
              <NavHashLink
                className={hashes.contact}
                onClick={() => makeActive("contact")}
                smooth
                to="/#contact-us"
              >
                Contact Us
              </NavHashLink>
            </div>
          </div>
          <div className="rest-icon-container">
            <CartIcon {...props} />
            <FavouriteIcon {...props} />
          </div>
        </nav>
      </div>
    </header>
  );
}
