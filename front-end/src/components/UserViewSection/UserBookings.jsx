import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNav from "./UserNav";
import "./BookingLayouts.css";

function UserBookings() {
  const userId = localStorage.getItem("userId");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      getUserBookings();
    }
  }, [userId]);

  const getUserBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/booking/user/${userId}`);
      if (res.data && res.data.bookings) {
        setBookings(res.data.bookings);
      }
    } catch (err) {
      console.log("Error fetching user bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.put(`http://localhost:5000/booking/status/${bookingId}`, { status: "Cancelled" });
        setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: "Cancelled" } : b));
      } catch (err) {
        console.log("Error cancelling booking:", err);
        alert("Failed to cancel booking. Please try again.");
      }
    }
  };

  const getStatusColor = (status) => {
    if (status === "Confirmed") return "status-confirmed";
    if (status === "Pending") return "status-pending";
    if (status === "Rejected" || status === "Cancelled") return "status-rejected";
    return "status-default";
  };

  return (
    <div className="main my-bookings-main">
      <UserNav />
      {/* Dynamic Background Video for Premium Feel */}
      <video autoPlay muted loop className="bg-video">
        <source src="https://videos.pexels.com/video-files/3141549/3141549-uhd_2560_1440_25fps.mp4" type="video/mp4" />
      </video>
      <div className="overlay dark-overlay"></div>
      
      <div className="my-bookings-container">
        <div className="my-bookings-header">
          <h2 className="title-gradient">My Bookings</h2>
          <p>View and manage all your room and table reservations</p>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <i className="fa-solid fa-spinner fa-spin fa-2x" style={{marginBottom: "15px", color: '#a5b4fc'}}></i>
            <p>Loading your luxurious stays...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="no-bookings">
             <i className="fa-solid fa-calendar-xmark fa-3x" style={{marginBottom: "15px", color: '#64748b'}}></i>
             <h3>No Bookings Found</h3>
             <p>You haven't made any reservations yet. Explore hotels to book a room or table.</p>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookings.map((b) => (
              <div key={b._id} className="modern-booking-card">
                 <div className={`card-glow ${getStatusColor(b.status)}`}></div>
                 <div className="card-header">
                    <div className="hotel-info">
                       <span className="hotel-icon">🏨</span>
                       <div style={{display: 'flex', flexDirection: 'column'}}>
                         <h3 className="hotel-name">Hotel: {b.shopName || "Unknown Hotel"}</h3>
                         {b.status === "Confirmed" && b.shopNumber && (
                           <span style={{fontSize: "13px", color: "#34d399", marginTop: "3px", fontWeight: "600"}}>
                             <i className="fa-solid fa-phone"></i> {b.shopNumber}
                           </span>
                         )}
                       </div>
                    </div>
                    <span className={`status-badge ${getStatusColor(b.status)}`}>
                      {b.status}
                    </span>
                 </div>
                 
                 <div className="card-body">
                    <div className="item-title">
                       <h4>{b.bookingType === "Room" ? `Room: ${b.itemName || "N/A"}` : `Table: ${b.itemName || "N/A"}`}</h4>
                       <span className={`type-badge type-${b.bookingType?.toLowerCase()}`}>
                         {b.bookingType === "Room" ? "🛏️ Room" : "🍽️ Table"}
                       </span>
                    </div>

                    <div className="booking-details">
                       <div className="detail-item">
                          <span className="detail-label">Check-in / Date</span>
                          <span className="detail-value">
                            {new Date(b.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                       </div>
                       
                       {b.bookingType === "Room" ? (
                         <div className="detail-item">
                            <span className="detail-label">Check-out</span>
                            <span className="detail-value">
                              {new Date(b.checkoutDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                         </div>
                       ) : (
                         <div className="detail-item">
                            <span className="detail-label">Time</span>
                            <span className="detail-value time-value">{b.time}</span>
                         </div>
                       )}
                    </div>

                    {b.foodItems && b.foodItems.length > 0 && (
                      <div className="preordered-food">
                         <h5>Pre-ordered Food</h5>
                         <ul>
                           {b.foodItems.map((food, i) => (
                             <li key={i}>
                               <span className="food-name">{food.name} <small>x{food.quantity}</small></span>
                               <span className="food-price">₹{food.price * food.quantity}</span>
                             </li>
                           ))}
                         </ul>
                      </div>
                    )}
                    
                    {(b.status === "Pending" || b.status === "Confirmed") && (
                       <button
                         onClick={() => handleCancel(b._id)}
                         className="cancel-btn"
                       >
                         Cancel Booking <i className="fa-solid fa-ban" style={{marginLeft: '5px'}}></i>
                       </button>
                    )}
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserBookings;
