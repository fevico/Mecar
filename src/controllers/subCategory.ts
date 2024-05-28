import { RequestHandler } from "express";
import { sendErrorRes } from "src/utils/helper";
import subCategoryModel from "src/model/subCategory";

export const createSubCategory: RequestHandler = async (req, res) => {
    const {name, categoryId} = req.body;
    const newCategory = await subCategoryModel.create({name, categoryId})
    res.status(201).json(newCategory)
}

export const getAllSubCategories: RequestHandler = async (req, res) => {
    const subCategories = await subCategoryModel.find()
    if(!subCategories) return sendErrorRes(res, "No subCategory record", 422)
    res.json(subCategories)
}

export const getSubCategoryById: RequestHandler = async (req, res) => {
   const {catId} = req.params
   const subCategory = await subCategoryModel.findById(catId)
   if(!subCategory) return sendErrorRes(res, "No category record", 422)
   res.json(subCategory)
}

export const updateSubCategory: RequestHandler = async (req, res) => {
   const {catId} = req.params
   const {name, categoryId} = req.body
   const subCategory = await subCategoryModel.findByIdAndUpdate(catId, {name, categoryId})
   if(!subCategory) return sendErrorRes(res, "No category record", 422)
   res.json(subCategory)
}

export const deleteSubCategory: RequestHandler = async (req, res) => {
   const {catId} = req.params
   const subCategory = await subCategoryModel.findByIdAndDelete(catId)
   if(!subCategory) return sendErrorRes(res, "No category record", 422)
    res.json({message: "Category deleted successfully"})
}

export const getSubcategoriesByCategoryId: RequestHandler = async (req, res) => {
   const {catId} = req.params
   const subCategories = await subCategoryModel.find({categoryId: catId})
   if(!subCategories) return sendErrorRes(res, "No subCategory record", 422)
   res.json(subCategories)
}

// export const getSubcategoriesByCategoryId = async (req: Request, res: Response) => {
//     const { categoryId } = req.params;
  
//     try {
//       const subcategories = await Subcategory.find({ categoryId });
//       if (!subcategories) {
//         return res.status(404).json({ message: 'No subcategories found for this category' });
//       }
//       res.status(200).json(subcategories);
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error });
//     }
//   };