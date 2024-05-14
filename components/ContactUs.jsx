import React from "react";
import { useForm } from "react-hook-form";
import { SlLocationPin } from "react-icons/sl";
import { FiPhoneCall } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [successMessage, setSuccessMessage] = React.useState("");
  const onSubmit = async (data) => {
    console.log(data);
    axios
      .post("https://cera.hyperfinition.com/users/contact_us", data)
      .then((response) => {
        // Handle successful response
        console.log("Data sent successfully", response.data);
        setSuccessMessage("Your message has been sent successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error sending data:", error);
      });
  };
  React.useEffect(() => {
    Aos.init({ duration: 1500, disable: "mobile", once: true });
  }, []);
  return (
    <section className="contact-us" id="contact-us">
      <div className="contact-us-form" data-aos="fade-right">
        <h2 className="contact-us-title">Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              {...register("name", { required: true, maxLength: 20 })}
              placeholder="Enter Your Name"
            />
            {errors.name?.type === "required" ? (
              <span className="error-message">This field is required</span>
            ) : (
              errors.name?.type === "maxLength" && (
                <span className="error-message">Max lenght is 20</span>
              )
            )}
          </div>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
              placeholder="Enter Your Email"
            />
            {errors.email && (
              <span className="error-message">This field is required</span>
            )}
          </div>
          <div className="input-field">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="number"
              {...register("phone", { required: true })}
              placeholder="Enter Your Phone Number"
            />
            {errors.phoneNumber && (
              <span className="error-message">This field is required</span>
            )}
          </div>
          <div className="input-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              aria-label="Enter your message"
              {...register("message", { required: true, maxLength: 500 })}
              placeholder="Message"
            ></textarea>
            {errors.message && (
              <span className="error-message">This field is required</span>
            )}
          </div>
          <div className="contact-us-subscribe">
            <input
              aria-label="Subscribe"
              type="checkbox"
              {...register("isSubscribed", { required: false })}
              placeholder="Name"
              id="subscribe"
            />
            <label htmlFor="subscribe">
              I would like to receive the newsletter.
            </label>
          </div>
          <p
            className={
              successMessage
                ? "contact-success-message"
                : "contact-none-message"
            }
          >
            {successMessage}
          </p>

          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="location-info" data-aos="fade-left">
        <iframe src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=31.045787,30.46440+(Cera)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
          <a href="https://www.gps.ie/">gps vehicle tracker</a>
        </iframe>
        <div className="contact-info-text">
          <SlLocationPin />
          <p>Damanhour, Egypt</p>
        </div>
        <div className="contact-info-text">
          <FiPhoneCall className="phone-icon" />
          <p>+20 111 222 333</p>
        </div>
        <div className="contact-info-text">
          <MdMailOutline />
          <a href="mailto:Jump@gmail.com">Jump@gmail.com</a>
        </div>
      </div>
    </section>
  );
}
