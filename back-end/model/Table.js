import mongoose from 'mongoose';
import { Schema } from 'mongoose';


const tableSchema = new mongoose.Schema({
    tableNumber: { type: Number, required: true },
    capacity: { type: Number, required: true },
    location: { type: String, required: true },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
});

const Table = mongoose.model('Table', tableSchema);

export default Table;