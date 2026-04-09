import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Agar server bisa menerima data JSON

// Test Endpoint Sederhana
app.get('/', (req, res) => {
    res.send('Server berjalan lancar! 👍');
});

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});