import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "src/controllers/category";

const categoryRouter = Router()

categoryRouter.post('/create', createCategory)
categoryRouter.get('/all-categories', getAllCategories)
categoryRouter.get('/catId/:catId', getCategoryById)
categoryRouter.patch('/:catId', updateCategory)
categoryRouter.delete('/:catId', deleteCategory)

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
 * /category/all-categories:
 *   get:
 *     summary: get all category
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
 *         description: Car details found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category found
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
 * /category/catId/{catId}:
 *   get:
 *     summary: get category by Id
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
 *         description: Car details found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category found
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
 * /category/{catId}:
 *   delete:
 *     summary: Delete category details
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the car to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *             example:
 *               name: Tire
 *               image: img 1
 *               
 *     responses:
 *       "200":
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Car details updated successfully
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

export default categoryRouter