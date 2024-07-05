import { ObjectId, Schema, model } from "mongoose";

interface Maintenance {
    location: string;
    carType: string;
    maintenaceType: string;
    maintenaceDate: Date;
    maintenaceTime: string;
    maintenaceDescription: string;
    carOwner: ObjectId;
    assignedMechanic: ObjectId;
    maintenanceStatus: "pending"| "in-progress" | "completed";
    // other properties a
}

const maintenanceSchema = new Schema <Maintenance>({
    location: { type: String, required: true },
    carType: { type: String, required: true },
    maintenaceType: { type: String, required: true },
    maintenaceDate: { type: Date, required: true },
    maintenaceTime: { type: String, required: true },
    maintenaceDescription: { type: String, required: true },
    carOwner: { type: Schema.Types.ObjectId, ref: "User" },
    assignedMechanic: { type: Schema.Types.ObjectId, ref: "User"},
    maintenanceStatus: { type: String, default: "pending" },
    // other properties
}, {timestamps: true})

const maintenanceModel = model("Maintenance", maintenanceSchema);
export default maintenanceModel