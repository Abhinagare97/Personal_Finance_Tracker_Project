import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const encodedEmail = encodeURIComponent(email);
      const encodedPassword = encodeURIComponent(password);
      const response = await axios.get(
        `http://localhost:5039/api/Users/login/${encodedEmail}/${encodedPassword}`
      );
      if (response.status === 200) {
        const userData = response.data;
        console.log(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage(error.response?.data || "Login failed");
    }
  };

  return (
    <div className="bg-image">
      {/* Finance Tracker text at top-right */}
      <div className="finance-tracker">💰 Finance Tracker</div>
      
      <div className="loginall">
        <div className="logg">
        <h2 className="login">Log in</h2>
        <form onSubmit={handleLogin} className="formm">
          <div className="mb-4">
            <label className="block">Email :</label>
            <input
              type="email"
              className="input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Password :</label>
            <input
              type="password"
              className="input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn">Log in</button>
        </form>
        <p style={{ color: "white" }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "white", textDecoration: "underline" }}>
            Register
          </a>
        </p>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </div>
      </div>
    </div>
  );
};

export default Login;
