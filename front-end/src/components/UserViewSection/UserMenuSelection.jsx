import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import UserNav from "./UserNav";
import "./UserMenuSelection.css";

function UserMenuSelection() {
  const { shopId, tableId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;

  const [menuItems, setMenuItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    // If somehow a user hits this page manually without booking data, kick them out
    if (!bookingData) {
      alert("Invalid access. Please book a table first.");
      navigate(`/tablesUser/${shopId}`);
      return;
    }
    fetchMenu();
  }, [shopId]);

  const fetchMenu = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/Menu/get/${shopId}`);
      if (res.data && res.data.menu) {
        setMenuItems(res.data.menu);
      }
    } catch (err) {
      console.log("Failed to fetch menu:", err);
    }
  };

  // Group items by category to build tabs dynamically
  const categories = ["All", ...new Set(menuItems.map(item => item.category))];

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handleQtyChange = (menuId, name, price, delta) => {
    setSelectedFood(prev => {
      const currentQty = prev[menuId]?.quantity || 0;
      const newQty = currentQty + delta;
      
      if (newQty <= 0) {
        const copy = { ...prev };
        delete copy[menuId];
        return copy;
      }

      return {
        ...prev,
        [menuId]: { menuId, name, price, quantity: newQty }
      };
    });
  };

  const calculateTotal = () => {
    return Object.values(selectedFood).reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const finalizeBooking = async () => {
    setLoading(true);
    const foodItemsArray = Object.values(selectedFood);

    const payload = {
      ...bookingData,
      foodItems: foodItemsArray
    };

    try {
      const res = await axios.post("http://localhost:5000/booking/table", payload);
      alert(res.data.message);
      navigate("/my-bookings");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed!");
    } finally {
      setLoading(false);
    }
  };

  if (menuItems.length === 0) {
    return (
      <div className="main">
        <UserNav />
        <div className="dark-overlay"></div>
        <div className="menu-loading-container">
          <h2>No pre-order menu available for this hotel.</h2>
          <button onClick={finalizeBooking} className="submit-btn" style={{width: 'auto', padding: '15px 40px', marginTop: '20px'}}>
            {loading ? "Confirming..." : "Skip Menu & Confirm Booking"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <UserNav />
      {/* Dynamic Background Image/Video Strategy */}
      <div className="menu-bg"></div>
      <div className="dark-overlay"></div>

      <div className="menu-selection-page">
        <div className="menu-header-area">
          <h2 className="title-gradient">Our Exquisite Menu</h2>
          <p>Pre-order your favorite dishes. They will be prepared for your arrival.</p>
        </div>

        <div className="menu-layout-grid">
          
          {/* Main Menu Feed */}
          <div className="menu-feed">
             <div className="category-tabs">
               {categories.map((cat, idx) => (
                 <button 
                   key={idx} 
                   className={`cat-btn ${activeCategory === cat ? 'active-cat' : ''}`}
                   onClick={() => setActiveCategory(cat)}
                 >
                   {cat}
                 </button>
               ))}
             </div>

             <div className="food-grid">
               {filteredItems.map(item => (
                 <div className="modern-food-card" key={item._id}>
                   <div className="food-image">
                     <span className={`veg-tag ${item.type === 'Non Veg' ? 'non-veg' : ''}`}>
                       <i className="fa-solid fa-circle"></i>
                     </span>
                     <img 
                       src={item.image ? `http://localhost:5000/uploads/${item.image}` : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} 
                       alt={item.name} 
                     />
                   </div>
                   <div className="food-details">
                     <h4>{item.name}</h4>
                     <p className="food-category">{item.category}</p>
                     <div className="food-price-row">
                       <span className="price">₹{item.price}</span>
                       <div className="food-controls">
                         {selectedFood[item._id] ? (
                           <div className="qty-controls">
                             <button onClick={() => handleQtyChange(item._id, item.name, item.price, -1)}><i className="fa-solid fa-minus"></i></button>
                             <span>{selectedFood[item._id].quantity}</span>
                             <button onClick={() => handleQtyChange(item._id, item.name, item.price, 1)}><i className="fa-solid fa-plus"></i></button>
                           </div>
                         ) : (
                           <button className="add-btn" onClick={() => handleQtyChange(item._id, item.name, item.price, 1)}>
                             Add <i className="fa-solid fa-plus"></i>
                           </button>
                         )}
                       </div>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Cart Sidebar */}
          <div className="menu-sidebar">
             <div className="cart-panel">
               <h3>Your Order</h3>
               <div className="cart-items">
                  {Object.values(selectedFood).length === 0 ? (
                    <div className="empty-cart">
                      <i className="fa-solid fa-plate-wheat fa-3x"></i>
                      <p>You haven't selected any dishes yet.</p>
                    </div>
                  ) : (
                    Object.values(selectedFood).map((item, idx) => (
                      <div className="cart-item-row" key={idx}>
                         <div className="cart-item-info">
                           <span className="cart-item-name">{item.name}</span>
                           <span className="cart-item-price">₹{item.price} x {item.quantity}</span>
                         </div>
                         <div className="cart-item-total">
                           ₹{item.price * item.quantity}
                         </div>
                      </div>
                    ))
                  )}
               </div>
               
               <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total Amount:</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                  <button 
                    onClick={finalizeBooking} 
                    className="confirm-booking-btn"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : (Object.values(selectedFood).length > 0 ? "Confirm with Food" : "Skip Food & Confirm")}
                  </button>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UserMenuSelection;
