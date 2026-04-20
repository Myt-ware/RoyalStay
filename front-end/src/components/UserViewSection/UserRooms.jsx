import React, { useEffect, useState } from "react";
import "./UserRooms.css";
import UserNav from "./UserNav";
import Footer from "./Footer";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UserRooms() {

  const { id } = useParams();
  const navigate = useNavigate();
  
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, [id]);

  const getRooms = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/room/get/${id}`);
      setRooms(res.data.rooms);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main">
      <UserNav />

      <video autoPlay muted loop className="bg-video">
        <source
          src="https://videos.pexels.com/video-files/5223106/5223106-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
      </video>
      <div className="dark-overlay"></div>

      <div className="rooms-page">
        <div className="title-header">
          <h2>Luxury Rooms</h2>
          <p>Discover our exclusive range of accommodations designed for your ultimate comfort.</p>
        </div>

        <div className="rooms-grid">
          {rooms.length === 0 ? (
            <h4 className="no-data"><i className="fa-solid fa-bed"></i> No rooms available at the moment.</h4>
          ) : (
           rooms.map((room) => {
             const features = ["Free Wi-Fi", "Daily Housekeeping", "Room Service"];
             if (room.roomType === "A/C") {
               features[1] = "Climate Control";
             }
             const isVIP = room.price > 1500;
             const description = isVIP 
               ? "Experience ultimate luxury and unparalleled comfort in our most exquisite suites equipped with premium top-tier amenities."
               : "Relax in our highly comfortable and perfectly appointed rooms designed perfectly for travelers looking for quality rest.";

             return (
              <div className="modern-room-card premium-mode" key={room._id}>
                
                <div className="card-image-wrapper">
                  <div className="premium-badge">
                    <i className={`fa-solid ${isVIP ? 'fa-crown' : 'fa-star'}`}></i> {room.roomType} Room
                  </div>
                  <img
                    src={room.image ? `http://localhost:5000/uploads/${room.image}` : "https://images.unsplash.com/photo-1611892440504-42a792e24d32"}
                    alt={room.roomName || "room"}
                  />
                  <div className="capacity-overlay">
                    <i className="fa-solid fa-user-group"></i> Up to {room.capacity} Guests
                  </div>
                </div>

                <div className="card-body">
                  <div className="card-header-row">
                     <h3>{room.roomName}</h3>
                  </div>
                  
                  <p className="room-description">{description}</p>
                  
                  <div className="room-features">
                    {features.map((f, idx) => (
                      <span key={idx} className="feature-item"><i className="fa-solid fa-check-circle"></i> {f}</span>
                    ))}
                  </div>

                  <hr className="divider" />
                  
                  <div className="room-footer">
                    <div className="price-hint">
                      <strong className="free-text">₹{room.price}</strong>
                      <span>Per Night</span>
                    </div>
                    <button 
                      className="book-room-btn" 
                      onClick={() => navigate(`/book-room/${id}/${room._id}?roomName=${room.roomName}`, { state: { roomDetails: room } })}
                    >
                      Reserve Now <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
           }))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserRooms;