import mongoose from "mongoose"

const menuSchema = new mongoose.Schema({

    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    type:{type:String,enum:["Veg","Non Veg"],required:true},
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
    image: { type: String, required: false },
});


const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
