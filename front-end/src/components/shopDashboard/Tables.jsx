import React,{useState,useEffect} from "react"
import axios from "axios"
import ShopNavbar from "./ShopNavbar"
import "./Tables.css"

function Tables(){

const shopId = localStorage.getItem("shopId")

const [tables,setTables] = useState([])

const [tableNumber,setTableNumber] = useState("")
const [capacity,setCapacity] = useState("")
const [location,setLocation] = useState("")
const [editId,setEditId] = useState(null)


useEffect(()=>{

getTables()

},[])


const getTables = async()=>{

const res = await axios.get(`http://localhost:5000/table/get/${shopId}`)

setTables(res.data.tables)

}


const addTable = async(e)=>{

e.preventDefault()

if(editId){

await axios.put(`http://localhost:5000/table/update/${editId}`,{

tableNumber,
capacity,
location

})

setEditId(null)

}else{

await axios.post("http://localhost:5000/table/add",{

tableNumber,
capacity,
location,
shopId

})

}

setTableNumber("")
setCapacity("")
setLocation("")
getTables()

}


const deleteTable = async(id)=>{

await axios.delete(`http://localhost:5000/table/delete/${id}`)

getTables()

}


const editTable = (table)=>{

setTableNumber(table.tableNumber)
setCapacity(table.capacity)
setLocation(table.location)

setEditId(table._id)

}


return(

<div>

<ShopNavbar/>

<div className="table-page">

<h2>Manage Tables</h2>

<form onSubmit={addTable} className="table-form">

<input
placeholder="Table Number"
value={tableNumber}
onChange={(e)=>setTableNumber(e.target.value)}
/>

<select
value={capacity}
onChange={(e)=>setCapacity(e.target.value)}
>

<option value="">Select Capacity</option>

<option value="2">2 Seats</option>
<option value="4">4 Seats</option>
<option value="6">6 Seats</option>
<option value="8">8 Seats</option>

</select>

<select
value={location}
onChange={(e)=>setLocation(e.target.value)}
>

<option value="">Select Location</option>

<option value="Indoor">Indoor</option>

<option value="Outdoor">Outdoor</option>

<option value="Rooftop">Rooftop</option>

<option value="Garden">Garden</option>

</select>

<button type="submit">

{editId ? "Update Table" : "Add Table"}

</button>

</form>


<h3>Tables List</h3>

<table>

<thead>

<tr>
<th>Table</th>
<th>Capacity</th>
<th>location</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{tables.map((table)=>(
<tr key={table._id}>

<td>{table.tableNumber}</td>
<td>{table.capacity}</td>
<td>{table.location}</td>

<td>

<button onClick={()=>editTable(table)}>
Edit
</button>

<button onClick={()=>deleteTable(table._id)}>
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

export default Tables