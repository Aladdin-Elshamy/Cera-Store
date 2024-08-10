import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import React from "react";
export default function PersonalInfoForm(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setCartProducts } = useOutletContext();
  const [faildMessage, setFaildMessage] = React.useState("");
  function clearCart() {
    setCartProducts([]);
    localStorage.removeItem("cartProducts");
  }
  function onSubmit(data) {
    data.products = [];
    try {
      clearCart();
      reset();
      navigate("/success", { replace: true });
    } catch (error) {
      setFaildMessage(`Error sending data: ${error}`);
      setTimeout(() => {
        setFaildMessage("");
      }, 3000);
    }
  }
  return (
    <div className="personal-info">
      <h1 className="personal-info-title">Personal Information</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
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
            type="email"
            id="email"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
            placeholder="Enter Your Email"
          />
          {errors.email?.type === "required" ? (
            <span className="error-message">This field is required</span>
          ) : (
            errors.email?.type === "pattern" && (
              <span className="error-message">Enter a valid email</span>
            )
          )}
        </div>
        <div className="input-field">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            type="text"
            {...register("phone", {
              required: true,
              minLength: 11,
              maxLength: 11,
              pattern: /^[0-9]+$/,
            })}
            placeholder="Enter Your Phone Number"
          />
          {errors.phone?.type === "required" ? (
            <span className="error-message">This field is required</span>
          ) : (
            (errors.phone?.type === "maxLength" ||
              errors.phone?.type === "minLength" ||
              errors.phone?.type === "pattern") && (
              <span className="error-message">Enter a valid phone number</span>
            )
          )}
        </div>
        <div className="input-field">
          <label htmlFor="country">Countery</label>
          <input
            id="countery"
            type="text"
            value="Egypt"
            disabled
            className="disabled-input"
          />
        </div>
        <div className="input-field">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            {...register("address", { required: true })}
            placeholder="Enter Your Address"
          />
          {errors.address && (
            <span className="error-message">This field is required</span>
          )}
        </div>
        {faildMessage && (
          <p style={{ fontWeight: 600, color: "#e10f15" }}>{faildMessage}</p>
        )}
        <button type="submit" className="btn">
          Checkout
        </button>
        <button
          type="button"
          className="btn btn-back"
          onClick={props.displayPayment}
        >
          Back
        </button>
      </form>
    </div>
  );
}
