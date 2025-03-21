import express from 'express';
import { productController } from '../controllers/productController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidProductId } from '../middlewares/isValid.js';

const router = express.Router();

router.get('/', ctrlWrapper(productController.getProducts));
router.get('/search', ctrlWrapper(productController.searchProducts));
router.get(
  '/:id',
  isValidProductId,
  ctrlWrapper(productController.getProductById),
);

export default router;
