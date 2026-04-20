import React from 'react'
import "./UserHome.css";
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';


function UserNav() {
    const [scrolled,setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    

    useEffect(()=>{
    
    const handleScroll = ()=>{
    
    if(window.scrollY > 60){
    setScrolled(true)
    }else{
    setScrolled(false)
    }
    
    }
    
    window.addEventListener("scroll",handleScroll)
    
    return ()=> window.removeEventListener("scroll",handleScroll)
    
    },[])
  return (
    <div className="mainn">
      <nav className={`navbar navbar-expand-lg navbar-dark custom-nav ${scrolled ? "nav-scroll" : ""}`}>
        <div className="container" style={{display: 'flex', alignItems: 'center'}}>

          <Link className="navbar-brand premium-brand-logo" to="/UserHome">
            Royal Stay
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

<div className="collapse navbar-collapse" id="navbarMenu">

<ul className="navbar-nav ms-auto">

<li className="nav-item">
 
<a className="nav-link" onClick={()=>window.location.replace("/UserHome")}>Home</a>
</li>

<li className="nav-item">
<Link className="nav-link" to="/my-bookings">My Bookings</Link>
</li>

<li className="nav-item">
<a className="nav-link" href="/UserProfile">Profile</a>
</li>

<li className="nav-item">
<a className="nav-link" href="#">Logout</a>
</li>

</ul>

</div>

</div>

</nav>

    </div>
  )
}

export default UserNav
