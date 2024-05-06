import { useOutletContext, Link } from "react-router-dom";
import { IoHeart } from "react-icons/io5";
export default function Wishlist() {
  const { savedProducts, removeProducts } = useOutletContext();
  if (savedProducts.length === 0) {
    return (
      <section className="wishlist container">
        <h1 className="wishlist-title">Your Wishlist</h1>
        <p className="wishlist-empty-message">Your wishlist is empty</p>
      </section>
    );
  }
  return (
    <section className="wishlist container">
      <h2 className="wishlist-title">Collections</h2>
      <div className="grid-container">
        {savedProducts.map((product) => (
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
