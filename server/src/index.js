import express from 'express';
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectDb } from './lib/db.js';
import messageRoutes from './routes/message.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json({ limit: "50mb" })); //added limit so that it does not give error for payload too large
app.use(express.urlencoded({ limit: "50mb", extended: true }));


// This is the CORS configuration that allows the client to make requests to the server.
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
))

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    connectDb();
});
