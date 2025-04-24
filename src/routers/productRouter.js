import express from 'express';
import { productController } from '../controllers/productController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidProductId } from '../middlewares/isValid.js';

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: This endpoint returns a list of all available products.
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Server error
 */
router.get('/', ctrlWrapper(productController.getProducts));

router.get('/:page', ctrlWrapper(productController.getProductsByPage));

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search for products
 *     description: This endpoint allows searching for products based on query parameters.
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search term for products
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of products to return
 *     responses:
 *       200:
 *         description: Search results
 *       400:
 *         description: Bad request, if the input is invalid
 *       500:
 *         description: Server error
 */
router.get('/search', ctrlWrapper(productController.searchProducts));

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: This endpoint returns a specific product based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The product with the specified ID
 *       404:
 *         description: Product not found for the given ID
 *       500:
 *         description: Server error
 */
router.get(
  '/:id',
  isValidProductId,
  ctrlWrapper(productController.getProductById),
);

export default router;
