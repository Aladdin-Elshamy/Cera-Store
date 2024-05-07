import { MdOutlineDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";
export default function Success() {
  const navigate = useNavigate();
  React.useEffect(() => {
    Aos.init({
      duration: 1500,
      disable: "mobile",
      once: true,
    });
  }, []);
  return (
    <section className="success" data-aos="fade-up">
      <img src="./images/bgSuccess.jpeg" />
      <div className="container">
        <div className="icon-container">
          <MdOutlineDone className="success-icon" />
        </div>
        <h1>Order Success!</h1>
        <p>
          Thank you for ordering our <br />
          products!
        </p>
        <button onClick={() => navigate("/")} className="btn">
          Back to Home
        </button>
      </div>
    </section>
  );
}
