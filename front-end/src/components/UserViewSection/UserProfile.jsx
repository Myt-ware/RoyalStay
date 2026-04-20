import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import UserNav from './UserNav.jsx';
import Footer from './Footer.jsx';
import "./UserProfile.css";
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  /* FORM STATES */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);

  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/User/Profile/${userId}`);
      setUser(res.data.user);
      setName(res.data.user.name || "");
      setEmail(res.data.user.email || "");
      setPhone(res.data.user.number || "");
      setAddress(res.data.user.address || "");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /* UPDATE USER */
  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("address", address);
    
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(`http://localhost:5000/User/update/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setEdit(false);
      setImage(null);
      setPreview(null);
      getUser();
    } catch (err) {
      console.log(err);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="main pro-profile-main">
      <UserNav />

      {/* BACKGROUND VIDEO */}
      <video autoPlay muted loop className="bg-video">
        <source src="https://videos.pexels.com/video-files/5223106/5223106-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>
      <div className="profile-overlay"></div>

      <div className="pro-profile-container">
        
        <div className="pro-profile-card">
          <div className="pro-card-header">
            <div className="avatar-wrapper">
              <img 
                className="profile-avatar"
                src={preview || (user.image ? `http://localhost:5000/uploads/${user.image}` : "https://i.pravatar.cc/150?img=12")} 
                alt="profile" 
              />
              {edit && (
                <div className="avatar-edit-overlay" onClick={() => fileInputRef.current.click()}>
                  <i className="fa-solid fa-camera"></i>
                  <span>Change</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    style={{display: 'none'}} 
                    onChange={handleImageChange}
                  />
                </div>
              )}
            </div>
            {!edit && (
              <div className="pro-header-info">
                <h2>{user.name || "Premium User"}</h2>
                <div className="premium-badge"><i className="fa-solid fa-crown"></i> VIP Member</div>
              </div>
            )}
          </div>

          <div className="pro-card-body">
            {!edit ? (
              /* --- VIEW MODE --- */
              <div className="pro-view-mode">
                <div className="info-grid">
                  <div className="info-box">
                    <div className="info-icon"><i className="fa-regular fa-envelope"></i></div>
                    <div className="info-text">
                      <label>Email Address</label>
                      <p>{user.email || "Not Provided"}</p>
                    </div>
                  </div>

                  <div className="info-box">
                    <div className="info-icon"><i className="fa-solid fa-mobile-screen"></i></div>
                    <div className="info-text">
                      <label>Phone Number</label>
                      <p>{user.number || "No Phone"}</p>
                    </div>
                  </div>

                  <div className="info-box full-width">
                    <div className="info-icon"><i className="fa-solid fa-map-location-dot"></i></div>
                    <div className="info-text">
                      <label>Location / Address</label>
                      <p>{user.address || "Not Added"}</p>
                    </div>
                  </div>
                </div>

                <div className="pro-actions">
                  <button className="pro-edit-btn" onClick={() => setEdit(true)}>
                    <i className="fa-solid fa-pen-to-square"></i> Edit Profile
                  </button>
                  <button className="pro-logout-btn" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                  </button>
                </div>
              </div>
            ) : (
              /* --- EDIT MODE --- */
              <form className="pro-edit-form" onSubmit={updateProfile}>
                <h3>Update Your Information</h3>
                
                <div className="pro-input-group">
                  <label>Full Name</label>
                  <div className="pro-input-wrapper">
                    <i className="fa-regular fa-user"></i>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
                  </div>
                </div>

                <div className="pro-input-group">
                  <label>Email Address</label>
                  <div className="pro-input-wrapper">
                    <i className="fa-regular fa-envelope"></i>
                    <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                  </div>
                </div>

                <div className="pro-input-group">
                  <label>Phone Number</label>
                  <div className="pro-input-wrapper">
                    <i className="fa-solid fa-phone"></i>
                    <input value={number} type="tel" onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required />
                  </div>
                </div>

                <div className="pro-input-group">
                  <label>Location / Address</label>
                  <div className="pro-input-wrapper">
                    <i className="fa-solid fa-map-pin"></i>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Your full address" required />
                  </div>
                </div>

                <div className="pro-actions edit-actions">
                  <button type="submit" className="pro-save-btn" disabled={loading}>
                    {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-check"></i>}
                    {loading ? " Saving..." : " Save Changes"}
                  </button>
                  <button type="button" className="pro-cancel-btn" onClick={() => {setEdit(false); setPreview(null); setImage(null);}}>
                    <i className="fa-solid fa-xmark"></i> Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserProfile;