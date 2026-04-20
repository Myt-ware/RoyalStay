import Booking from "../model/Booking.js";
import { Shop } from "../model/Shop.js";// Helper to calculate minutes from HH:mm
const getMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
};

export const bookRoom = async (req, res) => {
    try {
        const { userId, shopId, itemId, itemName, date, checkoutDate, contactNumber, customerName } = req.body;

        // Check for conflicting dates
        const existingBookings = await Booking.find({
            itemId,
            bookingType: "Room",
            status: { $in: ["Confirmed", "Pending"] }
        });

        // Convert strings to Date objects for comparison
        const reqStart = new Date(date).getTime();
        const reqEnd = new Date(checkoutDate).getTime();

        if (reqEnd <= reqStart) {
            return res.status(400).json({ message: "Checkout date must be after check-in date" });
        }

        const isConflict = existingBookings.some((b) => {
            const exStart = new Date(b.date).getTime();
            const exEnd = new Date(b.checkoutDate).getTime();

            // Two ranges [start1, end1) and [start2, end2) overlap if start1 < end2 and start2 < end1
            return reqStart < exEnd && exStart < reqEnd;
        });

        if (isConflict) {
            return res.status(400).json({ message: "Room is already booked for the selected dates." });
        }

        const newBooking = new Booking({
            userId,
            shopId,
            bookingType: "Room",
            itemId,
            itemName,
            date,
            checkoutDate,
            contactNumber,
            customerName
        });

        await newBooking.save();
        res.status(200).json({ message: "Room booked successfully!", booking: newBooking });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const bookTable = async (req, res) => {
    try {
        const { userId, shopId, itemId, itemName, date, time, foodItems, contactNumber, customerName } = req.body;

        // Ensure 20 min gap for same table on the same date
        const existingBookings = await Booking.find({
            itemId,
            bookingType: "Table",
            date,
            status: { $in: ["Confirmed", "Pending"] }
        });

        const reqMinutes = getMinutes(time);

        const isConflict = existingBookings.some((b) => {
            const exMinutes = getMinutes(b.time);
            return Math.abs(reqMinutes - exMinutes) < 20;
        });

        if (isConflict) {
            return res.status(400).json({ message: "Table is already booked at this time. Please select a time at least 20 minutes apart." });
        }

        const newBooking = new Booking({
            userId,
            shopId,
            bookingType: "Table",
            itemId,
            itemName,
            date,
            time,
            foodItems,
            contactNumber,
            customerName
        });

        await newBooking.save();
        res.status(200).json({ message: "Table booked successfully!", booking: newBooking });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getShopBookings = async (req, res) => {
    try {
        const { shopId } = req.params;
        const bookings = await Booking.find({ shopId }).sort({ createdAt: -1 });
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getTotalShopBookings = async (req, res) => {
    try {
        const { shopId } = req.params;
        const total = await Booking.countDocuments({ shopId });
        res.status(200).json({ total });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const { userId } = req.params;
        const bookingsData = await Booking.find({ userId }).sort({ createdAt: -1 }).lean();
        
        // Auto-clear logic: exclude Rejected/Cancelled and past bookings
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const activeBookings = bookingsData.filter(b => {
            // Remove Rejected and Cancelled immediately
            if (b.status === "Rejected" || b.status === "Cancelled") return false;

            // Remove if date has passed
            if (b.bookingType === "Room") {
                const endDate = new Date(b.checkoutDate);
                if (endDate < today) return false;
            } else {
                const bookingDate = new Date(b.date);
                if (bookingDate < today) return false;
            }

            return true;
        });

        const bookingsWithShop = await Promise.all(activeBookings.map(async (booking) => {
            const shopDoc = await Shop.findOne({ commonkey: booking.shopId });
            return {
                ...booking,
                shopName: shopDoc ? shopDoc.ShopName : "Unknown Hotel",
                shopNumber: shopDoc ? shopDoc.Number : null
            };
        }));

        res.status(200).json({ bookings: bookingsWithShop });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const booking = await Booking.findById(id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        booking.status = status;
        await booking.save();
        res.status(200).json({ message: "Status updated successfully", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        await Booking.findByIdAndDelete(id);
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error deleting booking" });
    }
};
