import { useNavigate } from "react-router-dom";
export default function Error404() {
  const navigate = useNavigate();
  return (
    <section className="not-found container">
      <img src="./images/not-found.png" alt="not found" />
      <h1>404</h1>
      <button onClick={() => navigate("Cera-Store/")} className="btn">
        Back to Home
      </button>
    </section>
  );
}
