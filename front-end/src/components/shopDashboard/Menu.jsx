import React, { useState, useEffect } from "react";
import axios from "axios";
import ShopNavbar from "./ShopNavbar";
import "./Menu.css";

function Menu() {

const shopId = localStorage.getItem("shopId")

const [menu,setMenu] = useState([])

const [name,setName] = useState("")
const [category,setCategory] = useState("")
const [price,setPrice] = useState("")
const [type,setType] = useState("")
const [image,setImage] = useState(null)

const [editId,setEditId] = useState(null)

useEffect(()=>{

getMenu()

},[])


const getMenu = async()=>{

const res = await axios.get(`http://localhost:5000/Menu/get/${shopId}`)

setMenu(res.data.menu)

}


const addMenu = async(e)=>{

e.preventDefault()

const formData = new FormData();
formData.append("name", name);
formData.append("category", category);
formData.append("price", price);
formData.append("type", type);
if (image) formData.append("image", image);

if(editId){
    await axios.put(`http://localhost:5000/Menu/update/${editId}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
    setEditId(null)
}else{
    formData.append("shopId", shopId);
    await axios.post("http://localhost:5000/Menu/add", formData, { headers: { "Content-Type": "multipart/form-data" } })
}

setName("")
setCategory("")
setPrice("")
setType("")
setImage(null)

getMenu()

}


const deleteMenu = async(id)=>{

await axios.delete(`http://localhost:5000/Menu/delete/${id}`)

getMenu()

}


const editMenu = (item)=>{

setName(item.name)
setCategory(item.category)
setPrice(item.price)
setType(item.type)
// setImage(item.image) // file inputs can't be assigned value easily

setEditId(item._id)

}

return(

<div>

<ShopNavbar/>

<div className="menu-page">

<h2>Menu Management</h2>

<form onSubmit={addMenu} className="menu-form">

<input
placeholder="Food Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
>
<option value="">Category</option>
<option value="Main Course">Main Course</option>
<option value="Snacks">Snacks</option>
<option value="Drinks">Drinks</option>
<option value="Dessert">Dessert</option>
</select>

<input
placeholder="Price"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<select
value={type}
onChange={(e)=>setType(e.target.value)}
>
<option value="">Food Type</option>
<option value="Veg">Veg</option>
<option value="Non Veg">Non Veg</option>
</select>

<input
type="file"
onChange={(e)=>setImage(e.target.files[0])}
accept="image/*"
/>

<button type="submit">
{editId ? "Update Item" : "Add Item"}
</button>

</form>

<div className="menu-grid">

{menu.map((item)=>(

<div className="menu-card" key={item._id}>

<img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name}/>

<h4>{item.name}</h4>

<p>{item.category}</p>

<p className="price">₹{item.price}</p>

<span className={item.type==="Veg" ? "veg":"nonveg"}>
{item.type}
</span>

<div className="menu-actions">

<button onClick={()=>editMenu(item)}>
Edit
</button>

<button onClick={()=>deleteMenu(item._id)}>
Delete
</button>

</div>

</div>

))}

</div>

</div>

</div>

)

}

export default Menu