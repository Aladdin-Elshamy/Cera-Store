import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
export default function PersonalInfoForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setCartProducts } = useOutletContext();

  function clearCart() {
    setCartProducts([]);
    localStorage.removeItem("cartProducts");
  }
  function onSubmit(data) {
    clearCart();
    navigate("Cera-Store/success", { replace: true });
  }
  return (
    <div className="personal-info" data-aos="fade-right">
      <h1 className="personal-info-title">Personal Information</h1>
      {props.paymentMethod === "vf-cash" ? (
        <h2>Vodafone Cash:01009876654</h2>
      ) : null}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-field">
          <label htmlFor="name">Name</label>
          <input
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
            {...register("phoneNumber", { required: true })}
            placeholder="Enter Your Phone Number"
          />
          {errors.phoneNumber && (
            <span className="error-message">This field is required</span>
          )}
        </div>
        <div className="input-field">
          <label htmlFor="countery">Countery</label>
          <input
            id="countery"
            type="text"
            value={"Egypt"}
            disabled
            className="disabled-input"
            {...register("countery")}
            placeholder="Enter Your Countery"
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
