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
    const { q } = req.query;
    const result = await productService.searchProducts({
      searchText: q,
    });
    if (!result.status) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  },
};
