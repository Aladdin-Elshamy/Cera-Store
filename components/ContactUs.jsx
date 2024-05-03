import React from "react";
import { useForm } from "react-hook-form";
import { FaLocationDot, FaPhoneVolume } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
    console.log(errors);
  }

  return (
    <section className="contact-us" id="contact-us">
      <div className="contact-us-form">
        <h2 className="contact-us-title">Contact Us</h2>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("name", { required: true, maxLength: 20 })}
            placeholder="Name"
          />
          {errors.name?.type === "required" ? (
            <span>This field is required</span>
          ) : (
            errors.name?.type === "maxLength" && <span>Max lenght is 20</span>
          )}

          <input
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
            placeholder="Email"
          />
          {errors.email && (
            <span className="error-message">This field is required</span>
          )}

          <textarea
            {...register("message", { required: true, maxLength: 500 })}
            placeholder="Message"
          ></textarea>
          {errors.message && (
            <span className="error-message">This field is required</span>
          )}
          <div className="contact-us-subscribe">
            <input
              type="checkbox"
              {...register("isSubscribed", { required: false })}
              placeholder="Name"
              id="subscribe"
            />
            <label htmlFor="subscribe">
              I would like to receive the newsletter.
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
        <div className="location-info">
          <iframe src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=31.045787,30.46440+(Cera)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
            <a href="https://www.gps.ie/">gps vehicle tracker</a>
          </iframe>
          <div className="contact-info-text">
            <FaLocationDot />
            <p>Damanhour, Egypt</p>
          </div>
          <div className="contact-info-text">
            <FaLocationDot />
            <p>Damanhour, Egypt</p>
          </div>
          <div className="contact-info-text">
            <FaPhoneVolume />
            <p>+20 111 222 333</p>
          </div>
          <div className="contact-info-text">
            <MdMailOutline />
            <a href="mailto:Jump@gmail.com">Jump@gmail.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}
