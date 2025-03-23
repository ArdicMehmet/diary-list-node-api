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

  async searchProducts({ searchText }) {
    const query = {};

    if (searchText && searchText.trim() !== '') {
      query.$or = [{ title: { $regex: searchText, $options: 'i' } }];
    }

    const result = await Product.find(query);
    if (result.length === 0) {
      return { message: 'Ürün kaydı bulunamadı!', status: false, data: [] };
    }
    return { message: 'Ürün başarıyla bulundu!', status: true, data: result };
  },
};
