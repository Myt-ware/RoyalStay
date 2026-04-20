import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/Login/Login",
        { email: email.trim(), password }
      )

      console.log(res);
 
      
      
      alert("Login Successful ✅");

      const role = res.data.user.role;
      const loginId = res.data.user._id;

      if (role === "User") {
        localStorage.setItem("userId", loginId);
        localStorage.removeItem("shopId"); // Ensure clean state
        navigate("/UserHome");
      } else if (role === "Shop") {
        localStorage.setItem("shopId", loginId);
        localStorage.removeItem("userId"); // Ensure clean state
        navigate("/shop-dashboard");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="login-wrapper">

      <div className="theme-background">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>


      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome Back</h2>

        <input
          type="email"
          placeholder="Email Address"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="login-btn">
          Login
        </button>

        <p className="register-text">
          New here? <Link to="/choose-register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;