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
    console.log(foundElement);
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
    product.quantity = quantity;
    const foundElement = cartProducts.find(
      (cartProducts) => cartProducts.id === product.id,
    );
    const foundSpecificElement = cartProducts.find(
      (cartProducts) =>
        cartProducts.id === product.id &&
        cartProducts.colors.id === product.colors.id &&
        cartProducts.sizes === product.sizes,
    );
    console.log(product);
    console.log(foundElement);
    if (!foundElement) {
      product.quantity = quantity;
      product.price = product.price * product.quantity;
      const newCartProducts = [...cartProducts, product];
      localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));
      setCartProducts(newCartProducts);
    } else {
      if (foundSpecificElement) {
        const newCartProducts = cartProducts.map((cartProduct) => {
          if (
            cartProduct.id === product.id &&
            cartProduct.colors.id === product.colors.id &&
            cartProduct.sizes === product.sizes
          ) {
            return {
              ...cartProduct,
              quantity: quantity,
              price: product.price * quantity,
            };
          }
          return cartProduct;
        });
        localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));
        setCartProducts(newCartProducts);
      } else if (foundElement) {
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
