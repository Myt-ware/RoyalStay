import express from "express";
import { getAllShops, registerShop, ShopProfile } from "../controller/ShopController.js";
import upload from "../middleware/upload.js";


const router = express.Router();

router.post('/ShopReg', upload.single('image'), registerShop);
router.get("/GetProfile/:id",ShopProfile)
router.get("/GetAll",getAllShops)


export default router;

