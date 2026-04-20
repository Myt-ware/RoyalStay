import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import "./Shop.css";

function ShopNavbar() {

  const LID = localStorage.getItem("shopId");
  const [shop, setShop] = useState({});
  const [pendingCount, setPendingCount] = useState(0);

  const getShop = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/Shop/GetProfile/${LID}`);
      setShop(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const getPendingCount = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/booking/shop/${LID}`);
      if (res.data && res.data.bookings) {
        const pending = res.data.bookings.filter(b => b.status === "Pending");
        setPendingCount(pending.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (LID) {
      getShop();
      getPendingCount();
    }
  }, [LID]);

  return (

    <nav className="navbar navbar-expand-md shop-navbar">

      <div className="container-fluid">

        <Link className="navbar-brand logo" to="/shop-dashboard">
          HotelAdmin
        </Link>

        {/* MOBILE TOGGLE BUTTON */}
        <button
          className="navbar-toggler d-md-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* DESKTOP MENU */}
        <div className="d-none d-md-flex ms-auto align-items-center">

          <ul className="navbar-nav nav-links">

<li className="nav-item">
<NavLink to="/shop-dashboard"
className={({isActive})=>isActive?"nav-link active-link":"nav-link"}>
Dashboard
</NavLink>
</li>

<li className="nav-item">
<NavLink to="/rooms"
className={({isActive})=>isActive?"nav-link active-link":"nav-link"}>
Rooms
</NavLink>
</li>

<li className="nav-item">
<NavLink to="/tables"
className={({isActive})=>isActive?"nav-link active-link":"nav-link"}>
Tables
</NavLink>
</li>

<li className="nav-item">
<NavLink to="/menu"
className={({isActive})=>isActive?"nav-link active-link":"nav-link"}>
Menu
</NavLink>
</li>

<li className="nav-item">
<NavLink to="/bookings"
className={({isActive})=>isActive?"nav-link active-link":"nav-link"}>
Bookings
{pendingCount > 0 && (
  <span style={{ background: "red", color: "white", padding: "2px 6px", borderRadius: "50%", fontSize: "12px", marginLeft: "5px", position: "relative", top: "-2px" }}>
    {pendingCount}
  </span>
)}
</NavLink>
</li>

</ul>

          <div className="nav-right">

            <span className="welcome">
              Welcome, {shop?.ShopName}
            </span>

            <Link to="/" className="logout-btn">
              Logout
            </Link>

          </div>

        </div>

      </div>

      {/* MOBILE RIGHT SLIDE MENU */}
      <div className="offcanvas offcanvas-end d-md-none mobile-menu" id="mobileMenu">

        <div className="offcanvas-header">

          <h5>HotelAdmin</h5>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>

        </div>

        <div className="offcanvas-body">

          <ul className="mobile-links">

            <li><Link to="/shop-dashboard">Dashboard</Link></li>
            <li><Link to="/rooms">Rooms</Link></li>
            <li><Link to="/tables">Tables</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/bookings">Bookings</Link></li>

          </ul>

          <div className="mobile-footer">

            <span>Welcome, {shop?.ShopName}</span>

            <Link to="/" className="logout-btn">
              Logout
            </Link>

          </div>

        </div>

      </div>

    </nav>

  );
}

export default ShopNavbar;