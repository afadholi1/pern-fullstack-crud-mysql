import express from "express";
import {
    getProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
} from "../controllers/ProductController.js";

const router = express.Router();

// Route untuk mengambil semua data
router.get('/products', getProducts);

// Route untuk mengambil satu data berdasarkan ID
router.get('/products/:id', getProductById);

// Route untuk menambah data baru
router.post('/products', saveProduct);

// Route untuk mengubah data
router.patch('/products/:id', updateProduct);

// Route untuk menghapus data
router.delete('/products/:id', deleteProduct);

export default router;