import React, { useEffect, useState } from "react";
import ShopNavbar from "./ShopNavbar";
import "./Shop.css";
import axios from "axios";

function ShopDash() {

const shopId = localStorage.getItem("shopId")

const [totalRooms,setTotalRooms] = useState(0)
const [totalTable,setTotalTable] = useState(0)
const [TotalBooking,setTotalBooking] = useState(0)
const [TotalMenu,setTotalMenu] = useState(0)


const getTotalRooms = async()=>{

const res = await axios.get(`http://localhost:5000/room/total/${shopId}`)

setTotalRooms(res.data.total)

}

const getTotalTable = async()=>{

  const res = await axios.get(`http://localhost:5000/table/total/${shopId}`)
  setTotalTable(res.data.total)
}
const getTotalBooking = async()=>{

  const res = await axios.get(`http://localhost:5000/booking/total/${shopId}`)
  setTotalBooking(res.data.total)
}
const getTotalMenu = async()=>{

  const res = await axios.get(`http://localhost:5000/menu/total/${shopId}`)
  setTotalMenu(res.data.total)
}

useEffect(()=>{

getTotalRooms()
getTotalTable()
getTotalBooking()
getTotalMenu()

},[])

  return (
    <div>

      <ShopNavbar />

      <div className="dashboard-container">

      <h2 className="dashboard-title">Dashboard Overview</h2>

      <div className="dashboard-cards">
<a href="/rooms" style={{textDecoration:"none"}}>
        <div  className="card-box" style={{backgroundColor:"#f8d7da"}} >
          <h3>{totalRooms}</h3>
          <p>Total Rooms</p>
        </div>
        </a>

<a href="/tables" style={{textDecoration:"none"}}>
        <div className="card-box" style={{backgroundColor:"#d1ecf1"}} >     
          <h3>{totalTable}</h3>
          <p>Total Tables</p>
        </div>
        </a>
<a href="/menu" style={{textDecoration:"none"}}>
        <div className="card-box" style={{backgroundColor:"#fff3cd"}} >
          <h3>{TotalMenu}</h3>
          <p>Total Menu Items</p>
        </div>
        </a>

        <div className="card-box" style={{backgroundColor:"#d4edda"}} >
          <h3>{TotalBooking}</h3>
          <p>Total Bookings</p>
        </div>

      </div>

      </div>

    </div>
  );
}

export default ShopDash;