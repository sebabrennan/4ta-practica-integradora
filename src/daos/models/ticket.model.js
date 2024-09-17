import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from "uuid";

export const ticketSchema = new Schema({
  code: { type: String, required: true, default: uuidv4() },
  purchase_datetime: { type: String, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

export const TicketModel = model(
  'ticket',
  ticketSchema
);

