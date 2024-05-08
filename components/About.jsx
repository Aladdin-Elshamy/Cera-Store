import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";
export default function About() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    Aos.init({ duration: 1500, disable: "mobile", once: true });
  }, []);
  return (
    <section className="about-section" id="about" ref={ref}>
      <div className="about-pic" data-aos="fade-right">
        <img src="./images/imgStand.png" alt="about-pic" />
      </div>
      <div className="about-info" data-aos="fade-left">
        <span className="about-info-data">About Us</span>
        <h2 className="about-info-title">Who Are We?</h2>
        <p className="about-info-text">
          At our online store, we believe that footwear and accessories are not
          just items to wear; they are expressions of style, personality, and
          functionality. We're passionate about providing you with a curated
          selection of shoes and bags that combine quality, comfort, and
          trendsetting designs.
        </p>
        <div className="about-info-targets">
          <div className="about-info-target-one about-info-target">
            <div className="about-icon hidden">
              <img src="./images/vission-icon.png" alt="" />
            </div>
            <div className="target-info">
              <h3 className="target-one-title">OUR VISION</h3>
              <p className="target-one-text">
                At Cera, we envision a world where style meets substance, where
                every step taken and every accessory carried reflects not just
                fashion, but also individuality, confidence, and purpose.
              </p>
            </div>
          </div>
          <div className="about-info-target-two about-info-target">
            <div className="about-icon hidden">
              <img src="./images/mission-icon.png" alt="" />
            </div>
            <div className="target-info">
              <h3 className="target-two-title">OUR MISSION</h3>
              <p className="target-two-text">
                At Cera, our mission is to empower individuals to step into
                their true selves with confidence and style. We are dedicated to
                providing a diverse range of high-quality footwear and
                accessories that not only elevate outfits but also elevate
                spirits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
