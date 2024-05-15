import { useOutletContext, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";
export default function Cart() {
  const { cartProducts, setCartProducts } = useOutletContext();
  const navigate = useNavigate();

  function deleteProduct(product) {
    const newSavedCartProducts = cartProducts.filter(
      (savedCartProduct) =>
        savedCartProduct.id !== product.id ||
        savedCartProduct.colors !== product.colors ||
        savedCartProduct.sizes !== product.sizes,
    );
    localStorage.setItem("cartProducts", JSON.stringify(newSavedCartProducts));
    setCartProducts(newSavedCartProducts);
  }
  React.useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({
      duration: 1500,
      disable: "mobile",
      once: true,
    });
  });
  if (cartProducts.length === 0) {
    return (
      <section className="cart container" data-aos="zoom-in">
        <h1 className="cart-title">Your Cart</h1>
        <p className="cart-empty-message">Your cart is empty</p>
      </section>
    );
  }
  return (
    <section className="cart-page container" data-aos="zoom-in">
      <h1 className="cart-title">Your Cart</h1>
      {cartProducts?.map((savedCartProduct) => {
        return (
          <div
            className="cart-product"
            key={
              savedCartProduct.id +
              savedCartProduct.colors.id +
              savedCartProduct.sizes
            }
          >
            <div className="cart-product-img">
              <img src={savedCartProduct.image} alt={savedCartProduct.title} />
            </div>
            <div className="cart-product-info">
              <h2 className="cart-product-title">{savedCartProduct.title}</h2>
              <p className="cart-product-description">
                {savedCartProduct.description}
              </p>
              <div className="cart-product-detail">
                <p>Color: {savedCartProduct.colors.name}</p>
                <p>Quantity: x{savedCartProduct.quantity}</p>
                <p>Size: {savedCartProduct.sizes}</p>
              </div>
              <div className="card-product-price-delete">
                <p className="cart-product-price">${savedCartProduct.price}</p>
                <button onClick={() => deleteProduct(savedCartProduct)}>
                  <MdDelete />
                </button>
              </div>
            </div>
            <div className="divider" />
          </div>
        );
      })}
      <div className="cart-product-total">
        <p>Total price:</p>
        <p>${cartProducts.reduce((a, b) => a + b.price, 0).toFixed(2)}</p>
      </div>
      <button
        className="cart-checkout btn"
        onClick={() => {
          navigate("/payment");
        }}
      >
        Checkout
      </button>
    </section>
  );
}
