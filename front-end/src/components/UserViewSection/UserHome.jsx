// UserHome.jsx complete replacement
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserHome.css";
import UserNav from "./UserNav";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function UserHome() {
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();

  const getShops = async () => {
    try {
      const res = await axios.get("http://localhost:5000/Shop/GetAll");
      setShops(res.data.shops);
    } catch (err) {
      console.log("Error fetching shops:", err);
    }
  };

  useEffect(() => {
    getShops();
  }, []);

  return (
    <div className="main home-main">
      <UserNav />

      {/* BACKGROUND VIDEO */}
      <video autoPlay muted loop className="bg-video">
        <source
          src="https://videos.pexels.com/video-files/5223106/5223106-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
      </video>
      <div className="home-overlay"></div>

      {/* HOTELS SECTION */}
      <div className="hotels-section">
        <div className="home-header">
          <h2>Premium Hotels & Restaurants</h2>
          <p>Discover and book the best places to stay and dine.</p>
        </div>

        <div className="new-hotel-grid">
          {shops.map((shop) => (
            <div className="new-hotel-card premium-mode" key={shop._id}>
              
              <div className="card-image-wrapper">
                <div className="hotel-badge">
                  <i className="fa-solid fa-star"></i> Top Rated
                </div>
                <img
                  src={shop.image ? `http://localhost:5000/uploads/${shop.image}` : "https://images.unsplash.com/photo-1566073771259-6a8506099945"}
                  alt="hotel"
                />
                <div className="hotel-overlay-tag">
                  <i className="fa-solid fa-building"></i> Hotel & Restaurant
                </div>
              </div>

              <div className="new-hotel-info">
                <h3>{shop.ShopName}</h3>

                <div className="hotel-details">
                  <div className="detail-row">
                    <span className="icon"><i className="fa-solid fa-location-dot"></i></span>
                    <p className="truncate-text" title={shop.address}>{shop.address}</p>
                  </div>
                  <div className="detail-row">
                    <span className="icon"><i className="fa-solid fa-phone"></i></span>
                    <p>{shop.Number}</p>
                  </div>
                </div>

                <hr className="divider" />

                <div className="hotel-footer">
                  <div className="status-hint">
                    <span>Availability</span>
                    <strong className="open-text">Open Now</strong>
                  </div>
                  <button 
                    className="view-hotel-btn" 
                    onClick={() => navigate(`/hotel/${shop.commonkey}?hotelName=${encodeURIComponent(shop.ShopName)}`)}
                  >
                    View Details <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserHome;