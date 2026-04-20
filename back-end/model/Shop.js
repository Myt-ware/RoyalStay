import { Schema } from "mongoose";
import mongoose from "mongoose";

const ShopSchema = new Schema({

    ShopName: { type: String, required: true },
    Email: { type: String, required: true, },
    address: { type: String, required: true },
    commonkey:{
        type:Schema.Types.ObjectId,
        ref:'login'
    },
    Number: { type: Number, required: true },
    image: { type: String, required: false },

});

export const Shop = mongoose.model('Shop', ShopSchema);