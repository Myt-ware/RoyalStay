import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import UserNav from "./UserNav";
import "./BookingLayouts.css";

function UserBookRoom() {
  const { shopId, roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const roomName = new URLSearchParams(location.search).get("roomName") || "Room";
  const room = location.state?.roomDetails;

  const [date, setDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in as a User to book.");
      setLoading(false);
      return navigate("/");
    }

    try {
      const res = await axios.post("http://localhost:5000/booking/room", {
        userId,
        shopId,
        itemId: roomId,
        itemName: roomName,
        date,
        checkoutDate,
        contactNumber: `${countryCode} ${contactNumber}`,
        customerName
      });

      alert(res.data.message);
      navigate(-1);
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <UserNav />
      {/* Background Video */}
      <video autoPlay muted loop className="bg-video">
        <source src="https://videos.pexels.com/video-files/5223106/5223106-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>

      <div className="overlay"></div>
      
      <div className="booking-page">
        {room ? (
          <div className="split-booking-container">
            {/* Left Panel: Premium Room Presentation */}
            <div className="room-presentation-panel">
              <div className="presentation-image-wrapper">
                <img 
                  src={room.image ? `http://localhost:5000/uploads/${room.image}` : "https://images.unsplash.com/photo-1611892440504-42a792e24d32"} 
                  alt={room.roomName || "Room View"} 
                />
                <div className="presentation-overlay-gradient"></div>
                <div className="presentation-badge">
                  <i className="fa-solid fa-star"></i> {room.roomType}
                </div>
                <div className="presentation-content">
                  <h2>{room.roomName}</h2>
                  <div className="presentation-meta">
                    <span><i className="fa-solid fa-user-group"></i> Up to {room.capacity} Guests</span>
                    <span className="presentation-price">₹{room.price}<small>/night</small></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Booking Form */}
            <div className="booking-form-panel">
              <div className="form-header">
                <h2>Reservation Details</h2>
                <p>Complete your booking for a premium stay.</p>
              </div>
              <form className="booking-form" onSubmit={handleBooking}>
                <div className="form-group-row">
                  <div className="form-group">
                    <label>Check-in</label>
                    <input 
                      type="date" required 
                      value={date} onChange={(e) => setDate(e.target.value)} 
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="form-group">
                    <label>Check-out</label>
                    <input 
                      type="date" required 
                      value={checkoutDate} onChange={(e) => setCheckoutDate(e.target.value)} 
                      min={date || new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Contact Number</label>
                  <div style={{display: 'flex', gap: '10px'}}>
                    <select 
                      value={countryCode} onChange={(e) => setCountryCode(e.target.value)}
                      className="country-select"
                    >
                      <option value="+91" style={{color: 'black'}}>🇮🇳 +91</option>
                      <option value="+1" style={{color: 'black'}}>🇺🇸 +1</option>
                      <option value="+44" style={{color: 'black'}}>🇬🇧 +44</option>
                      <option value="+971" style={{color: 'black'}}>🇦🇪 +971</option>
                    </select>
                    <input 
                      type="tel" required value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} 
                      placeholder="Phone number" style={{flex: 1}}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Customer Name</label>
                  <input 
                    type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} 
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="action-buttons">
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Confirming..." : "Confirm Booking"}
                  </button>
                  <button type="button" className="cancel-btn" style={{marginTop: 0}} onClick={() => navigate(-1)}>
                    Go Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="booking-card">
            <h2>Book {roomName}</h2>
            <form className="booking-form" onSubmit={handleBooking}>
              <div className="form-group">
                <label>Check-in Date (12:00 PM)</label>
                <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="form-group">
                <label>Check-out Date (11:00 AM)</label>
                <input type="date" required value={checkoutDate} onChange={(e) => setCheckoutDate(e.target.value)} min={date || new Date().toISOString().split("T")[0]} />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <div style={{display: 'flex', gap: '10px'}}>
                  <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="country-select">
                    <option value="+91" style={{color: 'black'}}>🇮🇳 +91</option>
                  </select>
                  <input type="tel" required value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder="Phone number" style={{flex: 1}} />
                </div>
              </div>
              <div className="form-group">
                <label>Customer Name</label>
                <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Enter your full name" />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Confirming..." : "Confirm Booking"}
              </button>
              <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
                 Go Back
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserBookRoom;
