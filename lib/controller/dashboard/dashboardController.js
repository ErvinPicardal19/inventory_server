const Product = require('../../models/Product');
const Customer = require('../../models/Customer');
const Orders = require('../../models/Customer');

const getAllDbSize = async(req, res) => {
   try{
      const productNo = await Product.count();

      return res.status(200).json({success: true, data: {productNo: productNo}})
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

module.exports = {
   getAllDbSize
}