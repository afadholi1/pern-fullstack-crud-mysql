import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ProductRoute from "./routes/ProductRoute.js"; // Import Route

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Menggunakan Route yang sudah dibuat
app.use(ProductRoute);

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});