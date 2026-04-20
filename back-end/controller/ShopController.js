import bcrypt from "bcrypt"
import Login from "../model/Login.js"
import { Shop } from "../model/Shop.js"
import { User } from "../model/User.js"


export const registerShop = async (req, res) => {
    console.log(req.body)
    const { ShopName, Email, address, Number, password } = req.body
    const image = req.file ? req.file.filename : null;
    try {
        const existingShop = await Login.findOne({Email})
        if (existingShop){ 
            return res.status(400).json({message:"email already existing"})
        }   const HashPass = await bcrypt.hash(password,10)
        const loginData =  new Login({email:Email,password:HashPass,role:"Shop"})
        await loginData.save()
        const shopData = new Shop({ShopName,Email,address,Number,commonkey:loginData._id, image})
        await shopData.save()
        return res.status(200).json({message:"register succesfully"})
    }catch (error) {
        console.log(error);
        res.status(500).json({message:"erorr"})
    }
}


export const ShopProfile = async (req, res) => {

    const { id } = req.params;
    console.log(id);   

    try {

        const profile = await Shop.findOne({
            commonkey: id
        });

        res.status(200).json({ user: profile });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
}



export const totalRooms = async (req, res) => {
  try {

    const shopId = req.params.id

    const count = await Room.countDocuments({ shopId: shopId })

    res.json({ total: count })

  } catch (err) {

    res.status(500).json(err)

  }
}

export const totalTable = async (req, res) => {
  try {

    const shopId = req.params.id

    const count = await Table.countDocuments({ shopId: shopId })

    res.json({ total: count })

    } catch (err) {
        res.status(500).json(err)
    }
}

export const getAllShops = async(req,res)=>{

try{

const shops = await Shop.find()

res.json({
success:true,
shops
})

}catch(err){

res.json({
success:false,
message:err.message
})

}

}
