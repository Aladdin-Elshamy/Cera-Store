import Hero from "../components/Hero";
import About from "../components/About";
import Collections from "../components/Collections";
import ContactUs from "../components/ContactUs";
import React from "react";
import axios from "axios";
export default function Home() {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=30",
        );
        if (!response.ok)
          throw new Error(`Failed to fetch data: Error ${response.status}`);
        const data = await response.json();

        console.log(data);
        const newData = data.map((product) => {
          return {
            ...product,
            colors: ["red", "green", "blue"],
            sizes: [36, 37, 38],
          };
        });
        console.log(newData);
        setData(newData);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="container">
      <Hero />
      <About />
      {loading ? (
        <h1 className="loading" id="collections">
          Loading...
        </h1>
      ) : error ? (
        <p className="error-message" id="collections">
          Error No Available Products
        </p>
      ) : (
        <Collections data={data} />
      )}
      <ContactUs />
    </div>
  );
}
