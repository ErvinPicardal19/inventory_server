const mongoose = require('mongoose')
const Customer = require('../../models/Customer');
const Order = require('../../models/Order');

const getAllCustomers = async(req, res) => {
   try{

      const customersList = await Customer.find();

      res.status(200).json({success: true, data: customersList});

   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const getCustomer = async(req,res) => {
   const id = req.params?.id
   if(!id) res.status(400).json({message: "ID parameter is required"});

   try{
      const foundCustomer = await Customer.findOne({_id: mongoose.Types.ObjectId(id)}).exec();

      if(!foundCustomer) return res.status(404).json({success: false, message: "Customer does not exist."});

      res.status(200).json({success: true, data: foundCustomer});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const addNewCustomer = async(req,res) => {
   const {name, email, phone, location} = req.body;
   if(!name || !email || !phone || !location) return res.status(404).json({success: false, message: `Please provide all requirements!`});

   try{

      const foundCustomer = await Customer.findOne({name: name}).exec();

      if(foundCustomer) return res.status(409).json({success: false, message: `${name} already exist`});

      const customer = await new Customer({
         name: name,
         email: email,
         phone: phone,
         location: location
      }).save();

      res.status(200).json({success: true, data: customer})

   } catch(err){
      res.status(500).json({message: err.message});
   }
}

const updateCustomer = async(req,res) => {
   const id = req.params?.id
   if(!id) res.status(400).json({message: "ID parameter is required"});

   try {
      const foundCustomer = await Customer.findOne({_id: mongoose.Types.ObjectId(id)}).exec();

      if(!foundCustomer) return res.status(404).json({success: false, message: "Customer does not exist."});

      if(req.body?.name) foundCustomer.name = req.body.name;
      if(req.body?.email) foundCustomer.email = req.body.email;
      if(req.body?.phone) foundCustomer.phone = req.body.phone;
      if(req.body?.location) foundCustomer.location = req.body.location;

      foundCustomer.save();

      res.status(200).json({success: true, data: foundCustomer});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const deleteCustomer = async(req, res) => {
   const id = req.params?.id
   if(!id) res.status(400).json({message: "ID parameter is required"});

   try{
      await Order.deleteOne({customer: mongoose.Types.ObjectId(id)}).exec();

      const result = await Customer.deleteOne({_id: mongoose.Types.ObjectId(id)}).exec();

      if(!result) return res.status(400).json({success: false, message: "Cannot delete customer"});

      res.status(200).json({success:true, data: result});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

module.exports = {
   getAllCustomers,
   getCustomer,
   addNewCustomer,
   updateCustomer,
   deleteCustomer
}