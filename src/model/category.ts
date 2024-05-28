import { Schema, model } from "mongoose";

interface servicesDocument{
    name:string;
    image:string;
}

const categorySchema = new Schema<servicesDocument>({
  name:{
    type:String,
    required:true
  },
  image:{
     type: String,
     required: true
  }
}, {timestamps: true})

const categoryModel = model('Category', categorySchema)
export default categoryModel;