import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './db.js'; // Keep extension .js in ESM
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Define allowed origins
const allowedOrigins = ['http://localhost:5173'];

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Route
app.get('/', (req, res) => {
  console.log(" Inside Home route handler");
  res.send("Hello Jee");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
