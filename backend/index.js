import path from "path";
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'
import { errorHandler } from "./middlewares/errorHandler.js";
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 3000;
connectDB();

const app = express();

app.use(cors({origin: "*"}))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());



app.use(errorHandler);


app.listen(port, ()=>{console.log(`Server running on PORT: ${port}`)});

