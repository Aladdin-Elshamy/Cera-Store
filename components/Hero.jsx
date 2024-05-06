import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";
// import ScrollToHashElement from "./ScrollToHashElement";
import { HashLink } from "react-router-hash-link";
import Aos from "aos";
import "aos/dist/aos.css";
export default function Hero() {
  const [imgs, setImgs] = useState([
    { src: "./images/pngwing1.png", className: "active" },
    { src: "./images/pngwing2.png", className: "deactive" },
    { src: "./images/pngwing3.png", className: "deactive" },
  ]);
  const [img, setImg] = useState(imgs[0].src);
  const [intervalId, setIntervalId] = useState(0);
  let ref = useRef(0);
  const imgsMemo = useMemo(() => imgs, []);

  function stopAndChangeImg(order) {
    clearInterval(intervalId);
    changeImg(order);
  }
  function changeImg(order) {
    setImg(imgsMemo[order].src);
    const newImgs = imgs.map((img, i) => {
      if (i === order) {
        return { ...img, className: "active" };
      } else {
        return { ...img, className: "deactive" };
      }
    });
    setImgs(newImgs);
  }

  useEffect(() => {
    Aos.init({ duration: 1500, disable: "mobile" });
    const interval = setInterval(() => {
      changeImg(ref.current);
      ref.current++;
      if (ref.current > 2) {
        ref.current = 0;
      }
    }, 2000);
    setIntervalId(interval);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="hero-section">
      <div className="hero-intro" data-aos="fade-right" data-aos-delay="100">
        <h1>
          Stylish <span>Shoes</span>
          <br /> For You
        </h1>
        <p>Shop the latest collection of shoes and accessories</p>

        <HashLink to="/#collections">Shop Now</HashLink>
      </div>
      <div className="hero-img hidden">
        <img src={img} alt="chosen-img" data-aos="zoom-in" />
      </div>
      <div className="hero-photos hidden" data-aos="fade-left">
        {imgs.map((img, i) => (
          <div
            className={`hero-img-btn ${imgs[i].className}`}
            key={i}
            onClick={() => stopAndChangeImg(i)}
          >
            <img src={img.src} alt={`hero-img-${i}`} className="hero-img" />
          </div>
        ))}
      </div>
    </section>
  );
}
