import { useNavigate } from "react-router-dom";
import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";
export default function Error404() {
  const navigate = useNavigate();
  React.useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({
      duration: 1500,
      disable: "mobile",
      once: true,
    });
  }, []);
  return (
    <section className="not-found container" data-aos="fade-down">
      <img src="./images/not-found.png" alt="not found" />
      <h1>404</h1>
      <button onClick={() => navigate("/")} className="btn">
        Back to Home
      </button>
    </section>
  );
}
