import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Login", required: true },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Login", required: true },
    bookingType: { type: String, enum: ["Room", "Table"], required: true },
    
    // Will refer to Room or Table based on bookingType
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    contactNumber: { type: String, required: true },
    customerName: { type: String, required: true },
    
    // The name/number of the room or table
    itemName: { type: String, required: true },

    date: { type: String, required: true }, // format: YYYY-MM-DD
    
    // For Tables
    time: { type: String }, // format: HH:mm (24 hour)
    
    // For Rooms
    checkoutDate: { type: String }, // format: YYYY-MM-DD
    
    // Optional Pre-ordered food
    foodItems: [
        {
            menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
            name: { type: String },
            quantity: { type: Number },
            price: { type: Number }
        }
    ],

    status: { type: String, enum: ["Pending", "Confirmed", "Rejected", "Cancelled"], default: "Pending" }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
