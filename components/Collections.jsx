import Pagination from "@mui/material/Pagination";
import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import Aos from "aos";
import "aos/dist/aos.css";
export default function Collections({ data }) {
  const [productsRange, setProductsRange] = React.useState({
    start: 1,
    end: 10,
  });

  const { storeProducts, removeProducts, savedProducts } = useOutletContext();
  const products = data;

  const pagesNum = Math.ceil(products?.length / 10);
  const ref = React.useRef(null);
  const displayedProducts = products?.slice(
    productsRange.start - 1,
    productsRange.end,
  );
  const navigate = useNavigate();
  React.useEffect(() => {
    Aos.init({ duration: 1500, disable: "mobile", once: true });
  }, []);
  const checkIsFavourite = (product) => {
    return savedProducts.some((savedProduct) => savedProduct.id === product.id);
  };
  /**
   * Function to display the next set of products.
   *
   */
  function displaySetOfProducts(event, page) {
    ref.current.scrollIntoView({ behavior: "smooth" });
    const lastPost = page * 10;
    const firstPost = lastPost - 10 + 1;
    setProductsRange({
      start: firstPost,
      end: lastPost,
    });
  }
  function handlePageChange(event, page) {
    displaySetOfProducts(event, page);
  }
  return (
    <section
      id="collections"
      className="collections"
      data-aos="fade-up"
      ref={ref}
    >
      <h2 className="collections-title">Collections</h2>
      <div className="grid-container">
        {displayedProducts?.map((product) => (
          <div className="product" key={product.id}>
            <div className="favourite-btn">
              {checkIsFavourite(product) ? (
                <IoHeart
                  className="heart-icon fill"
                  onClick={() => removeProducts(product)}
                />
              ) : (
                <IoIosHeartEmpty
                  className="heart-icon empty"
                  onClick={() => storeProducts(product)}
                />
              )}
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
                  {product.colors?.map((color) => (
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
              View Product
            </button>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <Pagination
          count={pagesNum}
          onChange={(e, p) => displaySetOfProducts(e, p)}
          onPageChange={(e, p) => handlePageChange(e, p)}
        />
      </div>
    </section>
  );
}
