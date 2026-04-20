import Login from "../model/Login.js";
import bcrypt from "bcrypt";


export const loginUser = async (req, res) => {
     console.log(req.body);
 
     try {
        const { email, password } = req.body
        const user = await Login.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(400).json({ message: "invalid password" })
        }
        return res.status(200).json({message:"login succesful",user})
     }catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || "Internal Server Error" })
        }     
}
