import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';

import dotenv from "dotenv";
import userRouter from './routes/userRoute.js';
dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use('/api/food', foodRouter);
app.use("/images", express.static('uploads'));      // uploads folder will be exposed at the '/images' address
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send('API Working!');
});

app.listen(port, ()=> console.log(`Server is running on port ${port}`));