import React, { useState } from "react";
import "./ShopRegistration.css";
import axios from "axios";
import { Link } from "react-router-dom";

function ShopRegistration() {
  const [ShopName, setShopName] = useState("");
  const [OwnerName, setOwnerName] = useState("");
  const [Email, setEmail] = useState("");
  const [Number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ShopName", ShopName);
    formData.append("OwnerName", OwnerName);
    formData.append("Email", Email);
    formData.append("Number", Number);
    formData.append("address", address);
    formData.append("password", password);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:5000/Shop/ShopReg", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Shop Registration successful ✅");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className="shop-register-wrapper">

      {/* 🎥 Background Video */}
      <video autoPlay muted loop className="bg-video">
        <source
          src="https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* <div className="overlay"></div> */}

      <form className="shop-register-card" onSubmit={handleSubmit}>
        <h2 className="shop-title">Partner With Royal Stay</h2>

        <input type="text" placeholder="Shop Name" required onChange={(e) => setShopName(e.target.value)} />
        <input type="text" placeholder="Owner Name" required onChange={(e) => setOwnerName(e.target.value)} />
        <input type="email" placeholder="Email Address" required onChange={(e) => setEmail(e.target.value)} />
        <input type="tel" placeholder="Phone Number" required onChange={(e) => setNumber(e.target.value)} />
        <textarea placeholder="Shop Address" rows="3" required onChange={(e) => setAddress(e.target.value)} />
        <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        <label style={{color:"white", fontSize:"14px", marginTop:"10px", display:"block", textAlign:"left", marginLeft:"10px"}}>Shop/Restaurant Image:</label>
        <input type="file" required onChange={(e) => setImage(e.target.files[0])} style={{color:"white"}} accept="image/*" />

        <button type="submit" className="register-btn">
          Register Shop
        </button>
        <p className="login-text">
                  Already have an account? <Link to="/">Login</Link>
                </p>
      </form>
    </div>
  );
}

export default ShopRegistration;