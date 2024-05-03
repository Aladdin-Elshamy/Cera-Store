import { useOutletContext, Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
export default function Wishlist() {
  const { savedProducts, setSavedProducts } = useOutletContext();
  function removeProducts(product) {
    const newSavedProducts = savedProducts.filter(
      (savedProduct) => savedProduct.id !== product.id,
    );
    localStorage.setItem("savedProducts", JSON.stringify(newSavedProducts));
    setSavedProducts(newSavedProducts);
  }
  if (savedProducts.length === 0) {
    return <p>Your wishlist is empty</p>;
  }
  return (
    <section className="wishlist container">
      {savedProducts.map((product) => (
        <div className="product" key={product.id}>
          <FaHeart className="heart-icon" />
          <Link to={`/${product.id}`}>
            <div className="prodect-info">
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
                        width: "20px",
                        height: "20px",
                        display: "inline-block",
                      }}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
          <button
            className="remove-from-favourite"
            onClick={() => removeProducts(product)}
          >
            remove from favourite
          </button>
          <button
            className="buy-it-now"
            onClick={() => navigate(`/${product.id}`)}
          >
            Buy it now
          </button>
        </div>
      ))}
    </section>
  );
}
