const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   customer : {
      type: mongoose.Types.ObjectId,
      ref: 'customer',
      required: true
   },
   product : {
      type: mongoose.Types.ObjectId,
      ref: 'product',
      required: true
   },
   quantity: {
      type: Number,
      default: 1
   }
});

module.exports = mongoose.model('order', orderSchema);