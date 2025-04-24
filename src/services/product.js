import Product from '../db/models/Product.js';
import { PAGES } from '../constants/index.js';
export const productService = {
  async getProducts() {
    const result = await Product.find();

    if (!result) {
      return { message: 'Ürün kaydı bulunamadı!', status: false, data: null };
    }
    return { message: 'Ürün başarıyla bulundu!', status: true, data: result };
  },
  async getProductsByPage(page) {
    const pageSize = PAGES.size;
    const skip = (page - 1) * pageSize;
    const result = await Product.find().skip(skip).limit(pageSize);

    if (!result || result.length === 0) {
      return { message: 'Ürün kaydı bulunamadı!', status: false, data: null };
    }

    return {
      message: 'Ürünler başarıyla bulundu!',
      status: true,
      data: result,
      page,
    };
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
