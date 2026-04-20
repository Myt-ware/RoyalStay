import React, { useState } from "react";
import "./Registration.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [number,setNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { name, email, age,number, gender, address, password, confirmPassword };

    try {
      const response = await axios.post(
        "http://localhost:5000/User/UserReg",
        body
      );

      alert("Registration successful ✅");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className="register-wrapper">

      {/* 🎥 Background Video */}
      <video autoPlay muted loop className="bg-video">
        <source
          src="https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      <div className="overlay"></div>

      <form className="register-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Guest Registration</h2>

        <input type="text" placeholder="Full Name" required onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email Address" required onChange={(e) => setEmail(e.target.value)} />
        <input type="number" placeholder="Age" min="1" required onChange={(e) => setAge(e.target.value)} />
        <input type="number" placeholder="Contact Number" required onChange={(e) => setNumber(e.target.value)} />

        <select required onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <textarea placeholder="Address" rows="3" required onChange={(e) => setAddress(e.target.value)} />

        <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} />

        <button type="submit">Create Account</button>

        <p className="login-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Registration;