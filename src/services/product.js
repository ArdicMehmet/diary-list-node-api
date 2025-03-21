import Product from '../db/models/Product.js';

export const productService = {
  async getProducts() {
    return await Product.find();
  },

  async getProductById(id) {
    return await Product.findById(id);
  },

  async searchProducts({ searchText, categories, minCalories, maxCalories, bloodType }) {
    const query = {};

    // Metin araması
    if (searchText) {
      query.$text = { $search: searchText };
    }

    // Kategori filtresi
    if (categories) {
      query.categories = { $in: Array.isArray(categories) ? categories : [categories] };
    }

    // Kalori aralığı filtresi
    if (minCalories !== undefined || maxCalories !== undefined) {
      query.calories = {};
      if (minCalories !== undefined) {
        query.calories.$gte = minCalories;
      }
      if (maxCalories !== undefined) {
        query.calories.$lte = maxCalories;
      }
    }

    // Kan grubu filtresi
    if (bloodType !== undefined && bloodType >= 0 && bloodType <= 4) {
      query[`groupBloodNotAllowed.${bloodType}`] = false;
    }

    return await Product.find(query);
  }
}; 