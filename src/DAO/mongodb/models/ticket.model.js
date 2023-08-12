import mongoose from 'mongoose';

import {
    v4 as uuidv4
} from 'uuid';

const collection = "ticket";

// Define el esquema del Ticket
const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        default: uuidv4(),
        unique: true,
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
        // Total de la compra.
    },
    purchase: {
        type: String,
        required: true,
        // Correo del usuario del carrito. 
    },
});

export const ticketModel = mongoose.model(collection, ticketSchema);