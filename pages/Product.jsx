import React from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
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
    fetch(`https://fakestoreapi.com/products/${productID}`).then((res) =>
      res.json().then((data) => {
        const newData = {
          ...data,
          colors: ["#f00", "#0f0", "#00f"],
          sizes: [36, 37, 38],
        };
        console.log(newData);
        setProduct(newData);
        setSpecificProduct(newData);
      }),
    );
  }, [productID]);

  const { cartProducts, storeCartProducts } = useOutletContext();

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
    console.log(newProduct);
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
    console.log(newProduct);
    setSpecificProduct(newProduct);
  }
  function increaseWantedQuantity() {
    setWantedQuantity((prevWantedQuantity) => prevWantedQuantity + 1);
  }

  function decreaseWantedQuantity() {
    setWantedQuantity((prevWantedQuantity) => prevWantedQuantity - 1);
  }
  function addToCart(specificProduct, productWantedQuantity) {
    storeCartProducts(specificProduct, productWantedQuantity);
    navigate("/payment");
  }
  return (
    <section className="product">
      <div className="product-img">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <p className="product-color">Select Color</p>
        <div className="product-colors">
          {product.colors?.map((color) => (
            <span
              key={color}
              className="color"
              style={{
                backgroundColor: color,
                width: "20px",
                height: "20px",
                display: "inline-block",
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
              className="product-size"
              onClick={() => setProductSize(size)}
            >
              {size}
            </span>
          ))}
        </div>
        <div className="product-quantity">
          <button
            className="product-quantity-btn"
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
          className="add-to-cart"
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
          className="buy-it-now"
          onClick={() => addToCart(specificProduct, productWantedQuantity)}
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
