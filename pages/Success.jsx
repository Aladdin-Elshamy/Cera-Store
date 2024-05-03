import { MdOutlineDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
export default function Success() {
  const navigate = useNavigate();
  return (
    <section className="success container">
      <MdOutlineDone />

      <h1>Success</h1>
      <p>Thank you for ordering our products!</p>
      <button onClick={() => clearAndReturn()}>Back to Home</button>
    </section>
  );
}
