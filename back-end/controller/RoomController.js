import Room from "../model/Room.js";


export const registerRoom = async (req,res)=>{
    console.log(req.body);
    const { roomName, capacity, price,roomType, shopId } = req.body
    const image = req.file ? req.file.filename : null;
    try {
        const roomData = new Room({roomName,capacity,price,roomType,shopId, image})
        await roomData.save()
        return res.status(200).json({message:"Room added successfully"})
    }catch (error) {
        console.log(error);
        res.status(500).json({message:"erorr"})
    }
}

export const getRooms = async (req,res)=>{
    const shopId = req.params.id
    console.log(shopId,'pppppppppp');
    
    try {
        const rooms = await Room.find({shopId: shopId})
        res.status(200).json({rooms})
    }catch (error) {
        console.log(error);
        res.status(500).json({message:"erorr"})
    }
}
    

export const deleteRoom = async (req,res)=>{
    const roomId = req.params.id
    try {
        await Room.findByIdAndDelete(roomId)
        res.status(200).json({message:"Room deleted successfully"})
    }catch (error) {
        console.log(error);
        res.status(500).json({message:"erorr"})
    }
}

export const updateRoom = async (req,res)=>{
    const roomId = req.params.id
    const { roomName, capacity,roomType, price } = req.body
    
    const updateData = {roomName,capacity,price,roomType}
    if (req.file) {
        updateData.image = req.file.filename;
    }
    
    try {
        await Room.findByIdAndUpdate(roomId, updateData)
        res.status(200).json({message:"Room updated successfully"})
        alert("Room updated successfully")
    }catch (error) {
        console.log(error);
        res.status(500).json({message:"erorr"})
    }   
}

export const getTotalRooms = async (req,res)=>{

    const shopId = req.params.id

    try{

        const total = await Room.countDocuments({shopId:shopId})

        res.status(200).json({total})

    }catch(error){

        console.log(error)

        res.status(500).json({message:"error"})

    }

}

