import React from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
export default function Login() {
  const navigate = useNavigate();
  const { cartProducts, setCartProducts, savedProducts, removeProducts } =
    useOutletContext();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  React.useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({
      duration: 1500,
      disable: "mobile",
      once: true,
    });
  }, []);
  console.log(location);
  const onSubmit = async (data) => {
    console.log(data.keepLogin);

    axios
      .post("https://cera.hyperfinition.com/auth/login/mobile", data)
      .then((response) => {
        // Handle successful response
        localStorage.setItem("loggedin", true);
        console.log("Data sent successfully", response.data);
        if (data.keepLogin) localStorage.setItem("keepLogin", true);
        if (!data.keepLogin) sessionStorage.setItem("sessionLogin", true);
        navigate(location.state?.from || "/", {
          replace: true,
          state: JSON.stringify({
            cartProducts,
            setCartProducts,
            savedProducts,
            removeProducts,
          }),
        });
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        setErrorMessage("Wrong username or password");
      });
  };
  return (
    <section className="login container" data-aos="fade-right">
      <h1 className="login-title">Login</h1>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter Your Password"
            />
            {errors.password && (
              <span className="error-message">This field is required</span>
            )}
          </div>

          <div className="contact-us-subscribe">
            <input
              aria-label="keep me login"
              type="checkbox"
              {...register("keepLogin", { required: false })}
              placeholder="Name"
              id="keep-me-login"
            />
            <label htmlFor="keep-me-login">Keep me login.</label>
          </div>
          <p
            className={
              errorMessage ? "login-success-message" : "login-none-message"
            }
          >
            {errorMessage}
          </p>

          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}
