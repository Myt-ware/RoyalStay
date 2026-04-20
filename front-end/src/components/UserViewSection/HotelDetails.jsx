import React from 'react';
import UserNav from './UserNav';
import Footer from './Footer';
import "./HotelDetails.css";
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';

function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const hotelName = new URLSearchParams(location.search).get("hotelName") || "Premium Hotel";

  return (
    <div className="main details-main">
      <UserNav />
      {/* Background Video */}
      <video autoPlay muted loop className="bg-video">
        <source src="https://videos.pexels.com/video-files/5223106/5223106-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>
      <div className="details-overlay"></div>

      <div className="details-section">
        <div className="details-header">
          <h2>{hotelName}</h2>
          <p>Choose what you want to explore</p>
        </div>

        <div className="details-grid">
          
          <Link to={`/roomsUser/${id}?hotelName=${encodeURIComponent(hotelName)}`} className="details-link">
            <div className="details-card">
              <div className="card-image-wrapper">
                <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a" alt="Rooms"/>
                <div className="card-badge">🛏️ Rooms</div>
              </div>
              
              <div className="details-info">
                <h3>Luxury Rooms</h3>
                <span className="hotel-subtitle">Accommodations</span>
                <p className="details-desc">Experience premium comfort with world-class facilities. Perfectly designed for your relaxation.</p>
                
                <div className="card-action">
                  <button>
                    Explore Rooms
                  </button>
                </div>
              </div>
            </div>
          </Link>

          <Link to={`/tablesUser/${id}?hotelName=${encodeURIComponent(hotelName)}`} className="details-link">
            <div className="details-card">
              <div className="card-image-wrapper">
                <img src="https://images.unsplash.com/photo-1555992336-03a23c7b20ee" alt="Tables"/>
                <div className="card-badge">🍽️ Tables</div>
              </div>
              
              <div className="details-info">
                <h3>Dining Tables</h3>
                <span className="hotel-subtitle">Fine Dining</span>
                <p className="details-desc">Reserve elegant tables for a fine dining experience. Savor the moment with loved ones.</p>
                
                <div className="card-action">
                  <button className="table-btn">
                    Explore Tables
                  </button>
                </div>
              </div>
            </div>
          </Link>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HotelDetails;
