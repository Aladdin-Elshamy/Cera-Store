import { useOutletContext, useNavigate } from "react-router-dom";
import React from "react";
import { IoHeart } from "react-icons/io5";
import Aos from "aos";
import "aos/dist/aos.css";
export default function Wishlist() {
  const { savedProducts, removeProducts } = useOutletContext();
  const navigate = useNavigate();
  React.useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({
      duration: 1500,
      disable: "mobile",
      once: true,
    });
  }, []);
  if (savedProducts.length === 0) {
    return (
      <section className="wishlist container" data-aos="zoom-in">
        <h1 className="wishlist-title">Your Wishlist</h1>
        <p className="wishlist-empty-message">Your wishlist is empty</p>
      </section>
    );
  }

  return (
    <section className="wishlist container" data-aos="zoom-in">
      <h2 className="wishlist-title">Your Wishlist</h2>
      <div className="grid-container">
        {savedProducts.map((product, i) => (
          <div className="product" key={product.id}>
            <div className="favourite-btn">
              <IoHeart
                className="heart-icon fill"
                onClick={() => removeProducts(product)}
              />
            </div>
            <div className="product-info">
              <img
                src={product.image}
                alt={product.title}
                className="product-img"
              />
              <h4 className="product-name">{product.title}</h4>
              <div className="product-price-colors">
                <p className="product-price">${product.price}</p>
                <div className="product-colors">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="color"
                      style={{
                        backgroundColor: color,
                      }}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
            <button
              className="add-to-cart btn"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
