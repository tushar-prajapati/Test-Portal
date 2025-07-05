import path from "path";
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'
import { errorHandler } from "./middlewares/errorHandler.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import questionRoutes from './routes/questionRoutes.js'

dotenv.config();
const port = process.env.PORT || 3000;
connectDB();

const app = express();

app.use(cors({
    origin: "https://test-portal-bay.vercel.app", // For production, uncomment this line and comment the below line
    // origin: "*", // For local development, uncomment this line and comment the above line
  credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/questions', questionRoutes);

app.use(errorHandler);


app.listen(port, ()=>{console.log(`Server running on PORT: ${port}`)});

