import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
} from '../controllers/productController';
import { protect, manager } from '../middleware/authMiddleware';

const router = express.Router();

// Protected routes
router.route('/')
  .get(protect, getProducts)
  .post(protect, manager, createProduct);

router.get('/low-stock', protect, getLowStockProducts);

router.route('/:id')
  .get(protect, getProductById)
  .put(protect, manager, updateProduct)
  .delete(protect, manager, deleteProduct);

export default router;