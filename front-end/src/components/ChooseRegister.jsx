import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChooseRegister.css";

function ChooseRegister() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">

      <div className="theme-background">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>


      {/* Content */}
      <div className="landing-content">
        <h1 className="main-title">Welcome to Royal Stay</h1>
        <p className="subtitle">
          Discover Rooms • Delicious Food • Luxury Experience
        </p>

        <div className="btn-group">
          <button
            className="reg-btn user-btn"
            onClick={() => navigate("/user-register")}
          >
            Register as User
          </button>

          <button
            className="reg-btn shop-btn"
            onClick={() => navigate("/shop-register")}
          >
            Register as Hotel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChooseRegister;