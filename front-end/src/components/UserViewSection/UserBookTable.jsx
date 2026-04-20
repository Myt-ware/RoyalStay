import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import UserNav from "./UserNav";
import "./BookingLayouts.css";

function UserBookTable() {
  const { shopId, tableId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const tableName = new URLSearchParams(location.search).get("tableName") || "Table";

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [customerName, setCustomerName] = useState("");

  const handleProceed = (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in as a User to book.");
      return navigate("/");
    }
    
    navigate(`/select-menu/${shopId}/${tableId}?tableName=${encodeURIComponent(tableName)}`, {
      state: {
        userId,
        shopId,
        bookingType: "Table",
        itemId: tableId,
        itemName: tableName,
        date,
        time,
        contactNumber: `${countryCode} ${contactNumber}`,
        customerName
      }
    });
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
        <div className="booking-card">
          <h2>Reserve {tableName}</h2>
          
          <form className="booking-form" onSubmit={handleProceed}>
            <div className="form-group">
              <label>Select Date</label>
              <input 
                type="date" 
                required 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="form-group">
              <label>Select Time Slot</label>
              <select 
                required 
                value={time} 
                onChange={(e) => setTime(e.target.value)} 
                className="time-select"
                style={{width: "100%", padding: "12px 15px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontSize: "16px"}}
              >
                <option value="" style={{color: "black"}}>Select a slot</option>
                <option value="07:30" style={{color: "black"}}>07:30 AM</option>
                <option value="08:00" style={{color: "black"}}>08:00 AM</option>
                <option value="08:30" style={{color: "black"}}>08:30 AM</option>
                <option value="09:00" style={{color: "black"}}>09:00 AM</option>
                <option value="09:30" style={{color: "black"}}>09:30 AM</option>
                <option value="10:00" style={{color: "black"}}>10:00 AM</option>
                <option value="10:30" style={{color: "black"}}>10:30 AM</option>
                <option value="11:00" style={{color: "black"}}>11:00 AM</option>
                <option value="11:30" style={{color: "black"}}>11:30 AM</option>
                <option value="12:00" style={{color: "black"}}>12:00 PM</option>
                <option value="12:30" style={{color: "black"}}>12:30 PM</option>
                <option value="13:00" style={{color: "black"}}>01:00 PM</option>
                <option value="13:30" style={{color: "black"}}>01:30 PM</option>
                <option value="14:00" style={{color: "black"}}>02:00 PM</option>
                <option value="14:30" style={{color: "black"}}>02:30 PM</option>
                <option value="15:00" style={{color: "black"}}>03:00 PM</option>
                <option value="15:30" style={{color: "black"}}>03:30 PM</option>
                <option value="16:00" style={{color: "black"}}>04:00 PM</option>
                <option value="16:30" style={{color: "black"}}>04:30 PM</option>
                <option value="17:00" style={{color: "black"}}>05:00 PM</option>
                <option value="17:30" style={{color: "black"}}>05:30 PM</option>
                <option value="18:00" style={{color: "black"}}>06:00 PM</option>
                <option value="18:30" style={{color: "black"}}>06:30 PM</option>
                <option value="19:00" style={{color: "black"}}>07:00 PM</option>
                <option value="19:30" style={{color: "black"}}>07:30 PM</option>
                <option value="20:00" style={{color: "black"}}>08:00 PM</option>
                <option value="20:30" style={{color: "black"}}>08:30 PM</option>
                <option value="21:00" style={{color: "black"}}>09:00 PM</option>
                <option value="21:30" style={{color: "black"}}>09:30 PM</option>
                <option value="22:00" style={{color: "black"}}>10:00 PM</option>
                <option value="22:30" style={{color: "black"}}>10:30 PM</option>
                <option value="23:00" style={{color: "black"}}>11:00 PM</option>
                <option value="23:30" style={{color: "black"}}>11:30 PM</option>
                <option value="00:00" style={{color: "black"}}>12:00 AM</option>
              </select>
            </div>

            <div className="form-group" style={{marginTop: "25px"}}>
              <label>Contact Number</label>
              <div style={{display: 'flex', gap: '10px'}}>
                <select 
                  value={countryCode} 
                  onChange={(e) => setCountryCode(e.target.value)}
                  style={{
                    padding: '12px', 
                    borderRadius: '12px', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(255,255,255,0.2)', 
                    color: 'white', 
                    outline: 'none', 
                    cursor: 'pointer',
                    width: '120px'
                  }}
                >
                  <option value="+91" style={{color: 'black'}}>🇮🇳 +91</option>
                  <option value="+1" style={{color: 'black'}}>🇺🇸 +1</option>
                  <option value="+44" style={{color: 'black'}}>🇬🇧 +44</option>
                  <option value="+971" style={{color: 'black'}}>🇦🇪 +971</option>
                  <option value="+61" style={{color: 'black'}}>🇦🇺 +61</option>
                  <option value="+974" style={{color: 'black'}}>🇶🇦 +974</option>
                  <option value="+966" style={{color: 'black'}}>🇸🇦 +966</option>
                  <option value="+65" style={{color: 'black'}}>🇸🇬 +65</option>
                </select>
                <input 
                  type="tel" 
                  required 
                  value={contactNumber} 
                  onChange={(e) => setContactNumber(e.target.value)} 
                  placeholder="Phone number"
                  style={{flex: 1}}
                />
              </div>
            </div>

            <div className="form-group" style={{marginTop: "25px"}}>
              <label>Customer Name</label>
              <input 
                type="text" 
                required 
                value={customerName} 
                onChange={(e) => setCustomerName(e.target.value)} 
                placeholder="Enter your full name"
              />
            </div>

            <button type="submit" className="submit-btn" style={{marginTop: "30px"}}>
              Proceed to Menu Selection <i className="fa-solid fa-arrow-right" style={{marginLeft: '10px'}}></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserBookTable;
