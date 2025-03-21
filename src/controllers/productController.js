import { productService } from '../services/product.js';

export const productController = {
  async getProducts(req, res) {
    const products = await productService.getProducts();
    res.json(products);
  },

  async getProductById(req, res) {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    res.json(product);
  },

  async searchProducts(req, res) {
    const { q, categories, minCalories, maxCalories, bloodType } = req.query;
    const products = await productService.searchProducts({
      searchText: q,
      categories,
      minCalories: minCalories ? Number(minCalories) : undefined,
      maxCalories: maxCalories ? Number(maxCalories) : undefined,
      bloodType: bloodType ? Number(bloodType) : undefined
    });
    res.json(products);
  }
}; 