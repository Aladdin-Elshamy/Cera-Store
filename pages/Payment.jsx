import { useOutletContext } from "react-router-dom";
import PersonalInfoForm from "../components/PersonalInfoForm";
import React from "react";
export default function Payment() {
  const { cartProducts } = useOutletContext();
  const [paymentMethod, setPaymentMethod] = React.useState(null);
  function handleChange(event) {
    setPaymentMethod(event.target.value);
  }
  function displayPayment() {
    setPaymentMethod(null);
  }
  return (
    <section className="payment container">
      {paymentMethod ? (
        <PersonalInfoForm
          displayPayment={displayPayment}
          paymentMethod={paymentMethod}
        />
      ) : (
        <div className="payment-method">
          <h1 className="payment-method-title">Payment Method</h1>
          <p className="payment-method-text">Please select a payment method</p>
          <div className="payment-method-options">
            <div className="payment-method-option">
              <input
                type="radio"
                name="payment-method"
                id="cash-on-delivery"
                value="cash-on-delivery"
                onChange={handleChange}
              />
              <label htmlFor="cash-on-delivery">Cash on delivery</label>
            </div>
            <div className="payment-method-option">
              <input
                type="radio"
                name="payment-method"
                id="vf-cash"
                value="vf-cash"
                onChange={handleChange}
              />
              <label htmlFor="debit-card">VF Cash</label>
            </div>
          </div>
          <button className="payment-method-submit" disabled={!paymentMethod}>
            Next
          </button>
        </div>
      )}
      <div className="order-summary">
        <h1 className="order-summary-title">Order Summary</h1>
        {cartProducts.map((product) => (
          <div className="order-summary-product" key={product.id}>
            <div className="order-summary-product-img">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="order-summary-product-info">
              <h3 className="order-summary-product-title">{product.title}</h3>
              <p className="order-summary-product-description">
                {product.description}
              </p>
              <div className="order-summary-product-detail">
                <p className="order-summary-product-color">
                  Color: {product.colors}
                </p>
                <p className="order-summary-product-quantity">
                  x{product.quantity}
                </p>
                <p className="order-summary-product-size">
                  Size: {product.sizes}
                </p>
              </div>
              <p className="order-summary-product-price">${product.price}</p>
            </div>
            <hr />
          </div>
        ))}
        <div className="order-summary-total">
          <p className="order-summary-total-text">Total</p>
          <p className="order-summary-total-price">
            ${cartProducts.reduce((a, b) => a + b.price, 0)}
          </p>
        </div>
        <div className="order-summary-shipping">
          <p className="order-summary-shipping-text">Shipping</p>
          <p className="order-summary-shipping-price">$10</p>
        </div>
        <hr />
        <div className="order-summary-total">
          <p className="order-summary-total-text">Total</p>
          <p className="order-summary-total-price">
            ${cartProducts.reduce((a, b) => a + b.price, 0) + 10}
          </p>
        </div>
      </div>
    </section>
  );
}
