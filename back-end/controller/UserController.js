import Login from "../model/Login.js"
import { User } from "../model/User.js"
import bcrypt from "bcrypt"


export const registerUser = async (req, res) => {
    console.log(req.body)
    const { name, email, age,number, address, password } = req.body
    try {
        const existingUser = await Login.findOne({email})
        if (existingUser){
            return res.status(400).json({message:"email already existing"})
        } const HashPass = await bcrypt.hash(password,10)
        const loginData =  new Login({email:email,password:HashPass,role:"User"})
        await loginData.save()
        const userData = new User({name,email,age,number,address,commonkey:loginData._id})
        await userData.save()
        return res.status(200).json({message:"register succesfully"})
    }catch (error) {
        console.log(error);
        res.status(500).json({message:"erorr"})
    }
}

export const getUserProfile = async (req, res) => {
    const { id } = req.params;
  try {

    const profile = await User.findOne({
                commonkey: id
            });
    
            res.status(200).json({ user: profile });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const updateUserProfile = async (req, res) => {

  try {

    const { id } = req.params;

    const { name, email, number, address } = req.body;
    let image = req.file ? req.file.filename : undefined;

    // 🔥 FIXED HERE
    const user = await User.findOne({ commonkey: id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // update
    user.name = name || user.name;
    user.email = email || user.email;
    user.number = number || user.number;
    user.address = address || user.address;
    if (image) user.image = image;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};