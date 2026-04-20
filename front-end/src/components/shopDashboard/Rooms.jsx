import React, { useState, useEffect } from "react";
import axios from "axios";
import ShopNavbar from "./ShopNavbar";
import "./Rooms.css";

function Room() {

    const shopId = localStorage.getItem("shopId");

    const [rooms, setRooms] = useState([])

    const [roomName, setRoomName] = useState("")
    const [capacity, setCapacity] = useState("")
    const [price, setPrice] = useState("")
    const [roomType, setRoomType] = useState("")
    const [image, setImage] = useState(null)
    const [editId, setEditId] = useState(null)

    useEffect(() => {

        getRooms()

    }, [])


    const getRooms = async () => {

        const res = await axios.get(`http://localhost:5000/room/get/${shopId}`)

        setRooms(res.data.rooms)

    }


    const addRoom = async (e) => {

        e.preventDefault()

        const formData = new FormData();
        formData.append("roomName", roomName);
        formData.append("capacity", capacity);
        formData.append("price", price);
        formData.append("roomType", roomType);
        if (image) formData.append("image", image);

        if (editId) {
            await axios.put(`http://localhost:5000/room/update/${editId}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
            setEditId(null)
        } else {
            formData.append("shopId", shopId);
            await axios.post("http://localhost:5000/room/add", formData, { headers: { "Content-Type": "multipart/form-data" } })
        }

        setRoomName("")
        setCapacity("")
        setPrice("")
        setRoomType("")
        setImage(null)
        getRooms()

    }


    const deleteRoom = async (id) => {

        await axios.delete(`http://localhost:5000/room/delete/${id}`)

        getRooms()

    }


    const editRoom = (room) => {

        setRoomName(room.roomName)
        setCapacity(room.capacity)
        setRoomType(room.roomType)
        setPrice(room.price)

        setEditId(room._id)

    }


    return (

        <div>

            <ShopNavbar />

            <div style={{ padding: "30px" }} className="roomC">

                <h2>Add Room</h2>

                <form onSubmit={addRoom} style={{ marginBottom: "30px" }} className="Forms">

                    <input
                        className="priceInput"
                        placeholder="Room Number"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    />

                    <input
                        className="priceInput"
                        placeholder="Capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                    />

                    <input
                        className="priceInput"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <select
                        className="priceInput"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                    >

                        <option value="">Select Room Type</option>
                        <option value="AC">AC</option>
                        <option value="Non AC">Non AC</option>

                    </select>

                    <input
                        type="file"
                        className="priceInput"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                        style={{ color: "white" }}
                    />

                    <button type="submit" style={{ background: "#2c5364", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", margin: "20px" }}>

                        {editId ? "Update Room" : "Add Room"}

                    </button>

                </form>

                <hr />

                <h2>Rooms List</h2>

                <table border="1" cellPadding="10" className="Table">

                    <thead>

                        <tr>

                            <th>Image</th>
                            <th>Room Number</th>
                            <th>Capacity</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {rooms.map((room) => (
                            <tr key={room._id}>

                                <td>
                                    <img 
                                        src={room.image ? `http://localhost:5000/uploads/${room.image}` : "https://images.unsplash.com/photo-1611892440504-42a792e24d32"} 
                                        alt="room" 
                                        style={{width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px"}} 
                                    />
                                </td>
                                <td>{room.roomName}</td>
                                <td>{room.capacity}</td>
                                <td>{room.roomType}</td>
                                <td>₹{room.price}</td>

                                <td>

                                    <button onClick={() => editRoom(room)} className="editBtn">
                                        Edit
                                    </button>

                                    <button onClick={() => deleteRoom(room._id)} className="deleteBtn">
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    )

}

export default Room