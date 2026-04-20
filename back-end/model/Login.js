import { Schema } from "mongoose"
import mongoose from "mongoose";


const LoginSchema = new Schema({
    email: { type: String, required: true, },
    password: { type: String, required: true },
    role: { type: String, required: true , enum: ["admin", "User","Shop"]},
})

const Login = mongoose.model("Login", LoginSchema)
export default Login