import { productService } from '../services/product.js';

export const productController = {
  async getProducts(req, res) {
    const result = await productService.getProducts();
    if (!result.status) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  },

  async getProductById(req, res) {
    const { id } = req.params;
    const result = await productService.getProductById(id);
    if (!result.status) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  },

  async searchProducts(req, res) {
    const { q, categories, minCalories, maxCalories, bloodType } = req.query;
    const result = await productService.searchProducts({
      searchText: q,
      categories,
      minCalories: minCalories ? Number(minCalories) : undefined,
      maxCalories: maxCalories ? Number(maxCalories) : undefined,
      bloodType: bloodType ? Number(bloodType) : undefined,
    });
    if (!result.status) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  },
};
