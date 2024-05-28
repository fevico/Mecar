import { Router } from "express";
import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategoryById, getSubcategoriesByCategoryId, updateSubCategory } from "src/controllers/subCategory";

const subCategoryRouter = Router();

subCategoryRouter.post("/create", createSubCategory);
subCategoryRouter.get("/all-subCat", getAllSubCategories);
subCategoryRouter.get("/subCat/:catId", getSubCategoryById);
subCategoryRouter.patch("/subCat/:catId", updateSubCategory);
subCategoryRouter.delete("/subCat/:catId", deleteSubCategory);
subCategoryRouter.get("/:catId", getSubcategoriesByCategoryId);

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Api endpoint to manage category details
 */

/**
 * @swagger
 * /category/create:
 *   post:
 *     summary: create category
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Category'
 *     responses:
 *       "200":
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category details created successfully
 *       "400":
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Bad request
 *       "422":
 *         description: Unprocessable request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unprocessable request
 *       "403":
 *         description: Unauthorized request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized request
 *       "500":
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /category/get-car-owner-details:
 *   get:
 *     summary: get all category
 *     tags:
 *       - Car
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Car'
 *     responses:
 *       "200":
 *         description: Car details found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Car details created successfully
 *       "400":
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Bad request
 *       "422":
 *         description: Unprocessable request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unprocessable request
 *       "403":
 *         description: Unauthorized request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized request
 *       "500":
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */


export default subCategoryRouter;
