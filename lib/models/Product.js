const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true
   },
   image: {
      type: String,
      default: ''
   },
   price: {
      type: Number,
      default: 0
   },
   categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: true
   },
   countInStock: {
      type: Number,
      required: true
   },
   dateCreated: {
      type: Date,
      default: Date.now()
   }
});

module.exports = mongoose.model('product', productSchema);