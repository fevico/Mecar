import { ObjectId, Schema, model } from "mongoose";

interface OrderDocument{
    userId: ObjectId,
    serviceId: ObjectId,
    name: string;
    referenceId: string;
    email: string;
    transactionId: string;
    currency: string;
    location: string;
    carModel: string;
    total: number;
    phone: string;
    message: string;
    orderStatus: "pending" | "confirmed" | "cancelled" | "delivered";
    paymantStatus: string,
    date: Date
}

const orderSchema = new Schema<OrderDocument>({
    name: {type: String},
    referenceId: {type: String},
    email: {type: String},
    transactionId: {type: String},
    currency: {type: String},
    total: {type: Number},
    location: {type: String},
    carModel: {type: String},
    orderStatus: {type: String, default: "pending"},
    phone: {type: String},
    paymantStatus: {type: String,  default: "pending"},
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service" },
    message: {type: String},
    date: {type: Date, default: Date.now},
})

const orderModel = model('Order', orderSchema);
export default orderModel;