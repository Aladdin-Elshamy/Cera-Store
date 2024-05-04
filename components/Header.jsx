import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import Hamburger from "hamburger-react";
import CartIcon from "./CartIcon";
import FavouriteIcon from "./FavouriteIcon";
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
  console.log(hashes);
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
    <header onClick={closeMenu}>
      <div className="container" canClose={true}>
        <nav>
          <div className="navbar">
            <div className="logo-container">
              <Link to="/" className="logo">
                Cera
              </Link>
            </div>
            <div className="nav-icons">
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

              <CartIcon {...props} />
              <FavouriteIcon {...props} />
            </div>
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
        </nav>
      </div>
    </header>
  );
}
