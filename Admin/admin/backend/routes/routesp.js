import express from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productControllers.js';

const router = express.Router();

// Routes for product operations
router.post('/', createProduct); // Endpoint for creating a new product
router.get('/', getProducts); // Endpoint for fetching all products
router.put('/:id', updateProduct); // Endpoint for updating a product
router.delete('/:id', deleteProduct); // Endpoint for deleting a product

export default router;
