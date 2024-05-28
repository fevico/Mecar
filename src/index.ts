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

const app = express();

app.use(express.static("src/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API
app.use("/auth", authRouter);
app.use("/car", carRouter);
app.use("/category", categoryRouter);
app.use("/subCategory", subCategoryRouter);

const spec = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

app.use(function (err, req, res, next) {
  res.status(500).json({ message: err.message });
} as express.ErrorRequestHandler);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
