import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Registration from './components/Registration.jsx'
import ShopRegistration from './components/ShopRegistration.jsx'
import Login from './components/Login.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChooseRegister from './components/ChooseRegister.jsx'
import ShopDash from './components/shopDashboard/ShopDash.jsx'
import UserHome from './components/UserViewSection/UserHome.jsx'
import Rooms from './components/shopDashboard/Rooms.jsx'
import Tables from './components/shopDashboard/Tables.jsx'
import Menu from './components/shopDashboard/Menu.jsx'
import UserNav from './components/UserViewSection/UserNav.jsx'
import UserProfile from './components/UserViewSection/UserProfile.jsx'
import HotelDetails from './components/UserViewSection/HotelDetails.jsx'
import UserRooms from './components/UserViewSection/UserRooms.jsx'
import UserTables from './components/UserViewSection/UserTables.jsx'
import UserBookRoom from './components/UserViewSection/UserBookRoom.jsx'
import UserBookTable from './components/UserViewSection/UserBookTable.jsx'
import UserBookings from './components/UserViewSection/UserBookings.jsx'
import Bookings from './components/shopDashboard/Bookings.jsx'
import UserMenuSelection from './components/UserViewSection/UserMenuSelection.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/choose-register" element={<ChooseRegister />} />
        <Route path="/user-register" element={<Registration />} />
        <Route path="/shop-register" element={<ShopRegistration />} />
        <Route path="/shop-dashboard" element={<ShopDash />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/tables" element={<Tables/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path='/UserHome' element={<UserHome/>}/>
        <Route path='/UserNav' element={<UserNav/> }/>
        <Route path='/UserProfile' element={<UserProfile/>} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/roomsUser/:id" element={<UserRooms />} />      
        <Route path="/tablesUser/:id" element={<UserTables />} />
        <Route path="/book-room/:shopId/:roomId" element={<UserBookRoom />} />
        <Route path="/book-table/:shopId/:tableId" element={<UserBookTable />} />
        <Route path="/select-menu/:shopId/:tableId" element={<UserMenuSelection />} />
        <Route path="/my-bookings" element={<UserBookings />} />
        <Route path="/bookings" element={<Bookings />} />
 </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
