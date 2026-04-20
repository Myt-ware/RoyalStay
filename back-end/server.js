import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserRouter from './router/UserRouter.js';
import ShopRouter from './router/ShopRouter.js';
import LoginRouter from './router/LoginRouter.js';
import RoomRouter from './router/RoomRouter.js';
import TableRouter from './router/TableRouter.js';
import MenuRouter from './router/MenuRouter.js';
import BookingRouter from './router/BookingRoute.js';

const server = express();
server.use(cors({origin: 'http://localhost:5173'}));
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
server.use(express.json());

mongoose.connect('mongodb://localhost:27017/RegistrationDB').then(() => {
    console.log("mogodb connected");
})
.catch((error)=>{
    console.log("mongodb connection error:", error);
})

server.listen(5000, () => console.log("Server is running on port 5000")
)

server.use('/User', UserRouter);
server.use('/Shop', ShopRouter);
server.use('/Login', LoginRouter);
server.use('/Room', RoomRouter);
server.use('/table', TableRouter);
server.use('/Menu', MenuRouter);
server.use('/booking', BookingRouter);
