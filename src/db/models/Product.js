import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  categories: [{
    type: String,
    required: true
  }],
  weight: {
    type: Number,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  groupBloodNotAllowed: {
    type: [Boolean],
    required: true,
    validate: {
      validator: function(v) {
        return v.length === 5;
      },
      message: 'groupBloodNotAllowed must have exactly 5 elements'
    }
  }
});

// Full-text arama için index ekleme
productSchema.index({ title: 'text', categories: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product; 