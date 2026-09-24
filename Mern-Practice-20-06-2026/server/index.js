import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import db from './config/db.js';
import userRoutes from './routes/userRoute.js';
import mongoose from 'mongoose';
import cors from 'cors';

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/',(req, res)=>{
    res.send("Api is starting...");
    
})
db();

app.listen(PORT, ()=>{
    console.log("Server is starting on :",`https://localhost:${PORT}`);
})

//commented line
