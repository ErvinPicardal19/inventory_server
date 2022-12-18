const { default: mongoose } = require('mongoose');
const Customer = require('../../models/Customer');
const Product = require('../../models/Product');
const Order = require('../../models/Order');

const getAllOrders = async(req, res) => {
   try{

      const orderList = await Order.find()
         .populate('product', 'name price')
         .populate('customer', 'name phone location')
         .exec();

      console.log(orderList);

      res.status(200).json({success: true, data: orderList});
      // res.status(400).json({message:"Testing error"});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const getOrder = async(req,res) => {
   const id = req.params?.id;
   if(!id) res.status(400).json({message: "ID parameter is required"});

   try{
      const foundOrder = await Order.findOne({_id: mongoose.Types.ObjectId(id)}).exec();

      if(!foundOrder) return res.status(404).json({success: false, message: "Order does not exist."});

      res.status(200).json({success: true, data: foundOrder});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const addNewOrder = async(req,res) => {
   const {customer, product, quantity} = req.body;
   if(!customer || !product || !quantity) return res.status(404).json({success: false, message: `Please provide all requirements!`});

   try{
      const foundProduct = await Product.findOne({name: product.name}).exec();

      const foundCustomer = await Customer.findOne({name: customer.name}).exec();

      if(!foundProduct || !foundCustomer) return res.status(400).json({success: false, message: "Invalid Order"});

      const order = await new Order({
         customer: foundCustomer._id,
         product: foundProduct._id,
         quantity: quantity,
      }).save();

      const response = await Order.findOne({_id: order})
         .populate('product', 'name price')
         .populate('customer', 'name phone location')
         .exec();

      console.log(response);

      res.status(200).json({success: true, data: response})

   } catch(err){
      console.log(err);
      res.status(500).json({message: err.message});
   }
}

const updateOrder = async(req,res) => {
   const id = req.params?.id
   if(!id) res.status(400).json({message: "ID parameter is required"});

   try {
      console.log("update:", req.body);
      const foundOrder = await Order.findOne({_id: mongoose.Types.ObjectId(id)}).exec();

      const foundProduct = await Product.findOne({name: req.body.product.name}).exec();

      const foundCustomer = await Customer.findOne({name: req.body.customer.name}).exec();

      if(!foundOrder) return res.status(404).json({success: false, message: "Order does not exist."});
      console.log("Product:", foundProduct , "\n", "Customer:", foundCustomer);
      // if(!foundProduct || !foundCustomer) return res.status(400).json({success: false, message: "Invalid Order"});

      if(foundCustomer) { 
         foundOrder.customer = mongoose.Types.ObjectId(foundCustomer._id); 
      };
      if(foundProduct) {
         foundOrder.product = mongoose.Types.ObjectId(foundProduct._id);
      };
      if(req.body?.quantity) {
         foundOrder.quantity = Number(req.body.quantity);
      }

      console.log("foundOrder:", foundOrder);
      foundOrder.save();

      res.status(200).json({success: true, data: foundOrder});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const deleteOrder = async(req, res) => {
   const id = req.params?.id
   if(!id) res.status(400).json({message: "ID parameter is required"});

   try{
      const result = await Order.deleteOne({_id: mongoose.Types.ObjectId(id)}).exec();

      if(!result) return res.status(400).json({success: false, message: "Cannot delete product"});

      res.status(200).json({success:true, data: result});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

module.exports = {
   getAllOrders,
   getOrder,
   addNewOrder,
   updateOrder,
   deleteOrder
}