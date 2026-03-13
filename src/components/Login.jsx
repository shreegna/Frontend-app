import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const { user, setUser, cart } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();

  const handleLogin = async () => {
    const url = API_URL + "/auth/signin";
    const response = await axios.post(url, user);
    setUser(response.data);
    if (cart.length > 0) Navigate("/cart");
    else Navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back ☕</h2>

        <input
          type="text"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter Email"
        />

        <input
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter Password"
        />

        <button onClick={handleLogin}>Login</button>

        <p className="register-text">
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;