import "dotenv/config";
import "express-async-errors";
import "src/db";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import options from "./swagger";
import authRouter from "./routes/auth";
import carRouter from "./routes/car";
import categoryRouter from "./routes/category";
import subCategoryRouter from "./routes/subCategory";
import serviceRouter from "./routes/service";

const app = express();

app.use(express.static("src/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API
app.use("/auth", authRouter);
app.use("/car", carRouter);
app.use("/category", categoryRouter);
app.use("/subCategory", subCategoryRouter);
app.use("/service", serviceRouter);

const spec = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

app.use(function (err, req, res, next) {
  res.status(500).json({ message: err.message });
} as express.ErrorRequestHandler);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

// /**
//  * @swagger
//  * tags:
//  *   name: Users
//  *   description: API endpoints for managing users
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     User:
//  *       type: object
//  *       required:
//  *         - firstName
//  *         - lastName
//  *         - email
//  *         - password
//  *         - role
//  *       properties:
//  *         firstName:
//  *           type: string
//  *         lastName:
//  *           type: string
//  *         email:
//  *           type: string
//  *         password:
//  *           type: string
//  *         role:
//  *           type: string
//  *           enum: [admin, user, pharmacy]
//  *         pharmacyDetails:
//  *           type: object
//  *           properties:
//  *             premisesLicence:
//  *               type: string
//  *             annualLicence:
//  *               type: string
//  *             businessName:
//  *               type: string
//  */

// import express from 'express';
// const router = express.Router();
// import { createUser } from '../controllers/userController';

// /**
//  * @swagger
//  * /users:
//  *   post:
//  *     summary: Create a new user
//  *     tags: [Users]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/User'
//  *     responses:
//  *       '201':
//  *         description: User created successfully
//  *       '500':
//  *         description: Internal server error
//  */
// router.post('/', createUser);

// export default router;
