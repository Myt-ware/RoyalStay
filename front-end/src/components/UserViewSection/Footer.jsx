import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="glass-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2><i className="fa-solid fa-hotel"></i> PremiumReservations</h2>
          <p>Discover, book, and enjoy the true definition of luxury at our globally partnered hotels and fine-dining restaurants.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/UserHome">Home</Link></li>
            <li><Link to="/my-bookings">My Bookings</Link></li>
            <li><Link to="/UserProfile">Profile</Link></li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Connect</h3>
          <div className="social-icons">
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PremiumReservations. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
