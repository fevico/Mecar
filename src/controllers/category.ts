import { RequestHandler } from "express";
import categoryModel from "src/model/category";
import { sendErrorRes } from "src/utils/helper";

export const createCategory: RequestHandler = async (req, res) => {
    const {name, image} = req.body;
    const newCategory = await categoryModel.create({name, image})
    res.status(201).json(newCategory)
}

export const getAllCategories: RequestHandler = async (req, res) => {
    const categories = await categoryModel.find()
    if(!categories) return sendErrorRes(res, "No category record", 422)
    res.json(categories)
}

export const getCategoryById: RequestHandler = async (req, res) => {
   const {catId} = req.params
   const category = await categoryModel.findById(catId)
   if(!category) return sendErrorRes(res, "No category record", 422)
   res.json(category)
}

export const updateCategory: RequestHandler = async (req, res) => {
   const {catId} = req.params
   const {name, image} = req.body
   const category = await categoryModel.findByIdAndUpdate(catId, {name, image})
   if(!category) return sendErrorRes(res, "No category record", 422)
   res.json(category)
}

export const deleteCategory: RequestHandler = async (req, res) => {
   const {catId} = req.params
   const category = await categoryModel.findByIdAndDelete(catId)
   if(!category) return sendErrorRes(res, "No category record", 422)
    res.json({message: "Category deleted successfully"})
}