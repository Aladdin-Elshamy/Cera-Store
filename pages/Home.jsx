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
        const response = await axios.get(
          "https://cera.hyperfinition.com/api/public/products",
        );
        if (response.status > 200 && response.status < 300)
          throw new Error(`Failed to fetch data: Error ${response.status}`);

        console.log(response.data.data);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
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
