import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const [user, setUser] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();

  const handleSubmit = async () => {
    const url = API_URL + "/auth/signup";
    const response = await axios.post(url, user);
    Navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account ☕</h2>

        <input
          type="text"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Enter Name"
        />

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

        <button onClick={handleSubmit}>Register</button>

        <p className="login-link">
          Already a member? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;