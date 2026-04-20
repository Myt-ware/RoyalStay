import React, { useEffect, useState } from "react";
import "./UserTables.css";
import UserNav from "./UserNav";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UserTables() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tables, setTables] = useState([]);

  useEffect(() => {
    getTables();
  }, [id]);

  const getTables = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/table/get/${id}`);
      setTables(res.data.tables || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main">
      <UserNav />

      {/* Background Video */}
      <video autoPlay muted loop className="bg-video">
        <source
          src="https://videos.pexels.com/video-files/5223106/5223106-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="dark-overlay"></div>

      <div className="tables-page">
        <div className="title-header">
          <h2>Premium Dining</h2>
          <p>Reserve the perfect table for an unforgettable culinary experience.</p>
        </div>

        <div className="tables-grid">
          {tables.length === 0 ? (
            <h3 className="no-data"><i className="fa-solid fa-utensils"></i> No tables available.</h3>
          ) : (
            tables.map((table) => {
              const isVIP = table.capacity <= 2;
              const features = isVIP 
                ? ["Intimate Setting", "Candlelight", "Dedicated Server"] 
                : ["Spacious Seating", "Family Friendly", "Priority Service"];
              const description = isVIP 
                ? "Perfect for romantic dinners and private conversations. Enjoy a quiet, exclusive atmosphere with personalized service."
                : "Ideal for groups and gatherings. Experience our vibrant dining environment with ample space for everyone.";

              return (
                <div className="modern-table-card premium-mode" key={table._id}>
                  
                  <div className="card-image-wrapper">
                    <div className="table-badge">
                      <i className={`fa-solid ${isVIP ? 'fa-crown' : 'fa-star'}`}></i> {isVIP ? 'VIP Dining' : 'Premium Dining'}
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1555992336-03a23c7b20ee"
                      alt="table"
                    />
                    <div className="capacity-overlay">
                      <i className="fa-solid fa-user-group"></i> Up to {table.capacity} Guests
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="card-header-row">
                      <h3>Table {table.tableNumber}</h3>
                      <span className="location-badge"><i className="fa-solid fa-map-pin"></i> {table.location || "Main Hall"}</span>
                    </div>

                    <p className="table-description">{description}</p>
                    
                    <div className="table-features">
                      {features.map((f, idx) => (
                        <span key={idx} className="feature-item"><i className="fa-solid fa-check-circle"></i> {f}</span>
                      ))}
                    </div>

                    <hr className="divider" />

                    <div className="table-footer">
                      <div className="price-hint">
                        <span>Reservation Fee</span>
                        <strong className="free-text">Complimentary</strong>
                      </div>
                      <button 
                        className="book-table-btn" 
                        onClick={() => navigate(`/book-table/${id}/${table._id}?tableName=Table+${table.tableNumber}`)}
                      >
                        Reserve Now <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default UserTables;