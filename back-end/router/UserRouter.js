import express from 'express';
import { getUserProfile, registerUser, updateUserProfile} from '../controller/UserController.js';
import upload from "../middleware/upload.js";

const router = express.Router();

router.post('/UserReg', registerUser);
router.get("/Profile/:id",getUserProfile)
router.put("/update/:id", upload.single("image"), updateUserProfile);

export default router;