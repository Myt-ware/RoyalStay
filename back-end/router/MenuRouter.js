import express from 'express';
import { addMenu, deleteMenu, getMenu, getTotalMenu, updateMenu } from '../controller/MenuController.js';
import upload from "../middleware/upload.js";


const router = express.Router();

router.post("/add", upload.single('image'), addMenu)
router.get("/get/:id",getMenu)
router.delete("/delete/:id",deleteMenu)
router.put("/update/:id", upload.single('image'), updateMenu)
router.get("/total/:id", getTotalMenu)


export default router