import React from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
export default function Product() {
  const productID = useParams().id;
  const [product, setProduct] = React.useState({});
  const [specificProduct, setSpecificProduct] = React.useState({});
  const [productDetail, setProductDetail] = React.useState({
    color: "",
    size: "",
  });
  const navigate = useNavigate();
  React.useEffect(() => {
    Aos.init({ duration: 1500, disable: "mobile", once: true });
    window.scrollTo(0, 0);
    fetch(`https://fakestoreapi.com/products/${productID}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        const newData = {
          ...data,
          colors: ["red", "green", "blue"],
          sizes: [36, 37, 38],
        };
        setProduct(newData);
        setSpecificProduct(newData);
      })
      .catch((error) => {
        navigate("/404");
      });
  }, [navigate, productID]);

  const { storeCartProducts } = useOutletContext();

  const [productWantedQuantity, setWantedQuantity] = React.useState(0);

  function setProductColor(color) {
    setProductDetail((prevProductDetail) => ({
      ...prevProductDetail,
      color: color,
    }));
    const newProduct = {
      ...specificProduct,
      colors: color,
    };
    setSpecificProduct(newProduct);
  }
  function setProductSize(size) {
    setProductDetail((prevProductDetail) => ({
      ...prevProductDetail,
      size: size,
    }));
    const newProduct = {
      ...specificProduct,
      sizes: size,
    };
    setSpecificProduct(newProduct);
  }
  function increaseWantedQuantity() {
    setWantedQuantity((prevWantedQuantity) => prevWantedQuantity + 1);
  }

  function decreaseWantedQuantity() {
    setWantedQuantity((prevWantedQuantity) => prevWantedQuantity - 1);
  }
  return (
    <section className="product-page container">
      <div className="product-img" data-aos="fade-right">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info" data-aos="fade-left">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <p className="product-color">Select Color</p>
        <div className="product-colors">
          {product.colors?.map((color) => (
            <span
              key={color}
              className={
                productDetail.color === color ? "color selected-color" : "color"
              }
              style={{
                backgroundColor: color,
              }}
              onClick={() => setProductColor(color)}
            ></span>
          ))}
        </div>
        <p className="product-size">Select Size</p>
        <div className="product-sizes">
          {product.sizes?.map((size) => (
            <span
              key={size}
              className={
                productDetail.size === size ? "size selected-size" : "size"
              }
              onClick={() => setProductSize(size)}
            >
              {size}
            </span>
          ))}
        </div>
        <div className="product-quantity">
          <button
            className="product-quantity-btn decrease-btn"
            onClick={decreaseWantedQuantity}
            disabled={productWantedQuantity === 0}
          >
            -
          </button>
          <span className="product-quantity-value">
            {productWantedQuantity}
          </span>
          <button
            className="product-quantity-btn"
            onClick={increaseWantedQuantity}
          >
            +
          </button>
        </div>
        <button
          className="add-to-cart btn"
          onClick={() =>
            storeCartProducts(specificProduct, productWantedQuantity)
          }
          disabled={
            productDetail.color && productDetail.size && productWantedQuantity
              ? false
              : true
          }
        >
          Add to cart
        </button>
        <button
          className="buy-it-now btn"
          onClick={() => {
            storeCartProducts(specificProduct, productWantedQuantity);
            navigate("/payment");
          }}
          disabled={
            productDetail.color && productDetail.size && productWantedQuantity
              ? false
              : true
          }
        >
          Buy it now
        </button>
      </div>
    </section>
  );
}
