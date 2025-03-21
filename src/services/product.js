import Product from '../db/models/Product.js';

export const productService = {
  async getProducts() {
    const result = await Product.find();

    if (!result) {
      return { message: 'Ürün kaydı bulunamadı!', status: false, data: null };
    }
    return { message: 'Ürün başarıyla bulundu!', status: true, data: result };
  },

  async getProductById(id) {
    const result = await Product.findById(id);
    if (!result) {
      return { message: 'Ürün kaydı bulunamadı!', status: false, data: null };
    }
    return { message: 'Ürün başarıyla bulundu!', status: true, data: result };
  },

  async searchProducts({
    searchText,
    categories,
    minCalories,
    maxCalories,
    bloodType,
  }) {
    const query = {};

    // Metin araması
    if (searchText) {
      query.$text = { $search: searchText };
    }

    // Kategori filtresi
    if (categories) {
      query.categories = {
        $in: Array.isArray(categories) ? categories : [categories],
      };
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

    const result = await Product.find(query);
    if (!result) {
      return { message: 'Ürün kaydı bulunamadı!', status: false, data: null };
    }
    return { message: 'Ürün başarıyla bulundu!', status: true, data: result };
  },
};
