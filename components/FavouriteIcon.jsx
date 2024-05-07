import { FaHeart } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

export default function FavouriteIcon(props) {
  const { savedProducts } = props;
  return (
    <div className="favourite">
      <Link to="/wishlist" className="heart-icon-container">
        <FaHeart className="heart-icon" />
        <span className="favourtie-count">{savedProducts.length}</span>
      </Link>
    </div>
  );
}
