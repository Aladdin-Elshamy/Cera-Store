import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function RootLayout() {
  const [savedProducts, setSavedProducts] = React.useState([]);
  const [cartProducts, setCartProducts] = React.useState([]);

  function storeProducts(product) {
    const foundElement = savedProducts.find(
      (savedProduct) => savedProduct.id === product.id,
    );
    if (!foundElement) {
      const newSavedProducts = [...savedProducts, product];
      localStorage.setItem("savedProducts", JSON.stringify(newSavedProducts));

      setSavedProducts((prevSavedProducts) => [...prevSavedProducts, product]);
    }
  }
  function removeProducts(product) {
    const newSavedProducts = savedProducts.filter(
      (savedProduct) => savedProduct.id !== product.id,
    );
    localStorage.setItem("savedProducts", JSON.stringify(newSavedProducts));
    setSavedProducts(newSavedProducts);
  }

  function storeCartProducts(product, quantity) {
    const foundElement = cartProducts.find(
      (cartProducts) => cartProducts.id === product.id,
    );
    const foundSpecificElement = cartProducts.find(
      (cartProducts) =>
        cartProducts.id === product.id &&
        cartProducts.colors === product.colors &&
        cartProducts.sizes === product.sizes,
    );
    if (!foundElement) {
      product.quantity = quantity;
      product.price = product.price * product.quantity;
      const newCartProducts = [...cartProducts, product];
      localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));
      setCartProducts(newCartProducts);
    } else {
      if (foundSpecificElement) {
        product.quantity = quantity + foundSpecificElement.quantity;
        const newCartProducts = cartProducts.map((cartProduct) => {
          if (
            cartProduct.id === product.id &&
            cartProduct.colors === product.colors &&
            cartProduct.sizes === product.sizes
          ) {
            return {
              ...cartProduct,
              quantity: product.quantity,
              price: product.price * product.quantity,
            };
          }
          return cartProduct;
        });
        localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));
        setCartProducts(newCartProducts);
      } else if (foundElement) {
        product.quantity = quantity;
        const newCartProducts = [...cartProducts, product];
        localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));
        setCartProducts(newCartProducts);
      }
    }
  }

  React.useEffect(() => {
    const storedProducts = localStorage.getItem("savedProducts");
    const storedCartProducts = localStorage.getItem("cartProducts");
    if (storedCartProducts) {
      setCartProducts(JSON.parse(storedCartProducts));
    }
    if (storedProducts) {
      setSavedProducts(JSON.parse(storedProducts));
    }
  }, []);

  return (
    <>
      <Header
        savedProducts={savedProducts}
        storeProducts={storeProducts}
        storeCartProducts={storeCartProducts}
        cartProducts={cartProducts}
      />
      <main>
        <Outlet
          context={{
            storeProducts,
            removeProducts,
            savedProducts,
            storeCartProducts,
            cartProducts,
            setCartProducts,
            setSavedProducts,
          }}
        />
      </main>

      <Footer />
    </>
  );
}
