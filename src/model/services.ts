import { ObjectId, Schema, model, Document } from "mongoose";

interface ServicesDocument extends Document{
    title: string;
    category: ObjectId;
    mechanicId: ObjectId
    description: string;
    price: number;
    workDays: string[];
    location: string;    
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
    }],
    location: { type: String, required: true}
}, {timestamps: true})

const serviceModel = model("Service", serviceSchema)
export default serviceModel;