import express from "express";
import { deleteRoom, getRooms, getTotalRooms, registerRoom, updateRoom } from "../controller/RoomController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/add", upload.single('image'), registerRoom);
router.get("/get/:id",getRooms)
router.put("/update/:id", upload.single('image'), updateRoom)
router.delete("/delete/:id",deleteRoom)
router.get("/total/:id", getTotalRooms)

export default router;