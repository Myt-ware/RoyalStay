import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, },
    age: { type: Number, required: true },
    number:{type:Number, requires: true},
    address: { type: String, required: true },
    commonkey:{
        type:Schema.Types.ObjectId,
        ref:'login'
    },
    image: { type: String, required: false }
});

export const User = mongoose.model('User', userSchema);