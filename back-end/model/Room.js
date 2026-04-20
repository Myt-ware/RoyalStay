import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const RoomSchema = new mongoose.Schema({
    roomName: { type: String, required: true },
    capacity: { type: Number, required: true },
    price: { type: Number, required: true },
    roomType:{type:String,enum:["AC","Non AC"],required:true},
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true },
    image: { type: String, required: false },
});

const Room = mongoose.model('Room', RoomSchema);

export default Room;