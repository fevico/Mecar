import "express-async-errors"
import "src/db";
import express from "express"
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import options from "./swagger";
import authRouter from "./routes/auth";

const app = express()

app.use(express.static('src/public'));

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// API
app.use('/auth', authRouter)

const spec = swaggerJsDoc(options)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec))

app.use(function (err, req, res, next){
    res.status(500).json({message: err.message})
} as express.ErrorRequestHandler)

app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000")
})
