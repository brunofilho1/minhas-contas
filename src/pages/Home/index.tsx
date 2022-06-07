import { useNavigate } from "react-router-dom";

export default function HomeScreen() {
  const navigate = useNavigate();

  return (
    <>
      <h1>HomeScreen</h1>
      <button onClick={() => navigate("/login")}>Go to LoginScreen</button>
      <button onClick={() => navigate("/register")}>
        Go to RegisterScreen
      </button>
    </>
  );
}
