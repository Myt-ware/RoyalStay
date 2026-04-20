import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopNavbar from "./ShopNavbar";

function Bookings() {
  const shopId = localStorage.getItem("shopId");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/booking/shop/${shopId}`);
      if (res.data && res.data.bookings) {
        setBookings(res.data.bookings);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/booking/status/${id}`, { status });
      getBookings(); // reload list
    } catch (err) {
      console.log(err);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to completely delete this booking?")) {
      try {
        await axios.delete(`http://localhost:5000/booking/delete/${id}`);
        getBookings();
      } catch (err) {
        console.log(err);
        alert("Failed to delete booking");
      }
    }
  };

  return (
    <div>
      <ShopNavbar />
      <div className="roomC">
        <h2>Manage Bookings</h2>
        <hr />
        
        {bookings.length === 0 ? (
          <h4 style={{ color: "white" }}>No bookings available yet.</h4>
        ) : (
          <table className="Table">
            <thead>
              <tr>
                <th>Booking Type</th>
                <th>Room / Table</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Contact Number</th>
                <th>Time / Checkout</th>
                <th>Food Addons</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.bookingType}</td>
                  <td>{b.itemName || b.itemId}</td>
                  <td style={{fontWeight: 'bold', color: '#ffb347'}}>{b.customerName || "N/A"}</td>
                  <td>{b.date}</td>
                  <td>{b.contactNumber || "N/A"}</td>
                  <td>
                    {b.bookingType === "Room" ? `To ${b.checkoutDate}` : b.time}
                  </td>
                  <td>
                    {b.foodItems && b.foodItems.length > 0 ? (
                      <ul>
                        {b.foodItems.map((food, i) => (
                          <li key={i}>{food.name} (x{food.quantity})</li>
                        ))}
                      </ul>
                    ) : (
                      "None"
                    )}
                  </td>
                  <td style={{ color: b.status === "Confirmed" ? "green" : b.status === "Pending" ? "orange" : "red", fontWeight: "bold" }}>
                    {b.status}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      {b.status === "Pending" && (
                        <>
                          <button onClick={() => updateStatus(b._id, "Confirmed")} style={{ background: "green", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>Accept</button>
                          <button onClick={() => updateStatus(b._id, "Rejected")} style={{ background: "red", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>Reject</button>
                        </>
                      )}
                      <button onClick={() => handleDelete(b._id)} style={{ background: "transparent", color: "#f87171", border: "1px solid rgba(248,113,113,0.3)", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }} title="Delete Booking">
                        <i className="fa-solid fa-trash"></i>Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Bookings;
