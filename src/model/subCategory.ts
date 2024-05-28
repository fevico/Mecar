import { ObjectId, Schema, model } from "mongoose";

interface subCategoryDocument{
    name:string;
    categoryId: ObjectId;
}

const SubCategorySchema = new Schema<subCategoryDocument>({
  name:{
    type:String,
    required:true
  },
  categoryId:{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
}, {timestamps: true})

const subCategory = model('subCategory', SubCategorySchema)
export default subCategory;