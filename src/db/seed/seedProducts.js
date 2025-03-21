import { initMongoConnection } from '../initMongoConnection.js';
import Product from '../models/Product.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedProducts = async () => {
  try {
    await initMongoConnection();
    console.log('MongoDB Connected Successfully!');

    // Mevcut ürünleri temizle
    await Product.deleteMany({});
    console.log('Existing products cleared');

    // JSON dosyasını oku
    const productsData = JSON.parse(
      await fs.readFile(path.join(__dirname, 'products.json'), 'utf-8')
    );

    // Veriyi doğru formata dönüştür ve doğrula
    const cleanedProducts = productsData.map(({ _id, __v, categories, ...product }) => {
      const formattedProduct = {
        ...product,
        categories: [categories]
      };

      // Zorunlu alanları kontrol et
      if (!formattedProduct.title || !formattedProduct.categories || !formattedProduct.weight || !formattedProduct.calories || !formattedProduct.groupBloodNotAllowed) {
        console.error('Missing required fields in product:', formattedProduct);
        return null;
      }

      return formattedProduct;
    }).filter(product => product !== null);

    console.log(`Processing ${cleanedProducts.length} valid products...`);

    // Yeni ürünleri ekle
    await Product.insertMany(cleanedProducts);
    console.log(`${cleanedProducts.length} products added successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    if (error.errors) {
      Object.keys(error.errors).forEach(key => {
        console.error(`Validation error for field ${key}:`, error.errors[key].message);
      });
    }
    process.exit(1);
  }
};

seedProducts();