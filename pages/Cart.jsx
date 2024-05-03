import { useOutletContext, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

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
  if (cartProducts.length === 0) {
    return (
      <section className="cart">
        <h1 className="cart-title">Your Cart</h1>
        <p className="cart-empty-message">Your cart is empty</p>
      </section>
    );
  }
  return (
    <section className="cart container">
      <h1 className="cart-title">Your Cart</h1>
      {cartProducts?.map((savedCartProduct) => {
        return (
          <div
            className="cart-product"
            key={
              savedCartProduct.id +
              savedCartProduct.colors +
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
                <p>Color: {savedCartProduct.colors}</p>
                <p>Quantity: x{savedCartProduct.quantity}</p>
                <p>Size: {savedCartProduct.sizes}</p>
              </div>
              <div className="card-product-price-delete">
                <p className="cart-product-price">{savedCartProduct.price}</p>
                <button onClick={() => deleteProduct(savedCartProduct)}>
                  <MdDelete />
                </button>
              </div>
            </div>
            <hr />
            <div className="cart-product-total">
              <p>Total price:</p>
              <p>{cartProducts.reduce((a, b) => a + b.price, 0)}</p>
            </div>
            <button
              className="cart-checkout"
              onClick={() => {
                navigate("/payment");
              }}
            >
              Checkout
            </button>
          </div>
        );
      })}
    </section>
  );
}
