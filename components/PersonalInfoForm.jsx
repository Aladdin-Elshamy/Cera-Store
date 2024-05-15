import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
export default function PersonalInfoForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { cartProducts, setCartProducts } = useOutletContext();

  function clearCart() {
    setCartProducts([]);
    localStorage.removeItem("cartProducts");
  }
  function onSubmit(data) {
    data.products = [];
    console.log(data);
    cartProducts.forEach((product) => {
      data.products.push({
        product_id: product.id,
        color_id: product.colors.id,
        size: product.sizes,
        quantity: product.quantity,
      });
    });
    axios
      .post("https://cera.hyperfinition.com/api/orders", data)
      .then((response) => {
        clearCart();
        navigate("/success", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
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
          {errors.phone && (
            <span className="error-message">This field is required</span>
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
