import { ObjectId, Schema, model } from "mongoose";

interface ServicesDocument{
    title: string;
    category: ObjectId;
    mechanicId: ObjectId
    description: string;
    price: number;
    workDays: string[];
}

const serviceSchema = new Schema<ServicesDocument>({
    title: { type: String, required: true},
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true},
    mechanicId: { type: Schema.Types.ObjectId, ref: "User"},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    workDays: [{
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    }]
}, {timestamps: true})

const serviceModel = model("Service", serviceSchema)
export default serviceModel;