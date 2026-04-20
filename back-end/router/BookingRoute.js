import express from "express";
import { bookRoom, bookTable, getShopBookings, getTotalShopBookings, getUserBookings, updateBookingStatus, deleteBooking } from "../controller/BookingController.js";

const router = express.Router();

router.post("/room", bookRoom);
router.post("/table", bookTable);
router.get("/shop/:shopId", getShopBookings);
router.get("/total/:shopId", getTotalShopBookings);
router.get("/user/:userId", getUserBookings);
router.put("/status/:id", updateBookingStatus);
router.delete("/delete/:id", deleteBooking);

export default router;
