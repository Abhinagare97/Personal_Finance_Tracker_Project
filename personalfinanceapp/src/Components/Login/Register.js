import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    userFirstName: "",
    userLastName: "",
    userName: "",
    passCodeHash: "",
    email: "",
    mobileNo: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:5039/api/Users", formData);
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data || "Registration failed");
    }
  };

  return (
    <div className="bg-image">
      {/* Finance Tracker text at top-right */}
      <div className="finance-tracker">💰 Finance Tracker</div>

      <div className="loginall">
        <div className="log" >
        <h2 className="login">Register</h2>
        <form onSubmit={handleRegister} className="w-3/4">
          <div className="mb-4">
            <label className="block">First Name : </label>
            <input
              type="text"
              name="userFirstName"
              className="input-bordered"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Last Name :</label>
            <input
              type="text"
              name="userLastName"
              className="input-bordered"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Username :</label>
            <input
              type="text"
              name="userName"
              className="input-bordered"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Email :</label>
            <input
              type="email"
              name="email"
              className="input-bordered"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Password :</label>
            <input
              type="password"
              name="passCodeHash"
              className="input-bordered"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Mobile No :</label>
            <input
              type="text"
              name="mobileNo"
              className="input-bordered"
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn">Register</button>
        </form>
        <p style={{ color: "white" }}>
          Have an account?{" "}
          <a href="/" style={{ color: "white", textDecoration: "underline" }}>
            Login
          </a>
        </p>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </div>
      </div>
    </div>
  );
};

export default Register;
