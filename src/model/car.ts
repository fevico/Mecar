import { Schema, model } from "mongoose";
import { ObjectId } from "mongoose";

interface carDocument{
    make: string;
    model: string;
    year: number;
    VIN: string;
    owner: ObjectId
}

const carSchema = new Schema<carDocument>({
    make:{
        type: String,
        required: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "CarOwner"
    },
    model:{
        type: String,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    VIN:{
        type: String,
        required: true
    }
}, {timestamps: true})

const CarModel = model("Car", carSchema)
export default CarModel; //exporting the model to be used in other files