import { useNavigate } from "react-router-dom";
export default function Error404() {
  const navigate = useNavigate();
  return (
    <div>
      <img src="./images/not-found.png" alt="not found" />
      <h1>404</h1>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}
