const { default: mongoose } = require('mongoose');
const Category = require('../../models/Category');
const Order = require('../../models/Order');
const Product = require('../../models/Product');

const getAllProduct = async(req, res) => {
   try{

      const productList = await Product.find().populate('categoryID');


      res.status(200).json({success: true, data: productList});
      // res.status(400).json({message:"Testing error"});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const getProduct = async(req,res) => {
   const id = req.params?.id
   if(!id) res.status(400).json({message: "ID parameter is required"});

   try{
      const foundProduct = await Product.findOne({_id: mongoose.Types.ObjectId(id)}).exec();

      if(!foundProduct) return res.status(404).json({success: false, message: "Category does not exist."});

      res.status(200).json({success: true, data: foundProduct});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const addNewProduct = async(req,res) => {
   const {name, description, image, price, categoryID, countInStock} = req.body;
   if(!name || !description || !categoryID || !countInStock) return res.status(404).json({success: false, message: `Please provide all requirements!`});

   try{
      
      
      const category = await Category.findOne({name: categoryID.name}).exec();

      if(!category) return res.status(400).json({success: false, messafe: "Invalid category"});

      const foundProduct = await Product.findOne({name: name}).exec();

      if(foundProduct) return res.status(409).json({success: false, message: `${name} already exist`});

      const product = await new Product({
         name: name,
         description: description,
         image: image,
         price: price,
         categoryID: category._id,
         countInStock: countInStock
      }).save();

      res.status(200).json({success: true, data: product, categoryName: category.name})

   } catch(err){
      res.status(500).json({message: err.message});
   }
}

const updateProduct = async(req,res) => {
   const id = req.params?.id
   if(!id) res.status(400).json({message: "ID parameter is required"});

   try {
      const foundProduct = await Product.findOne({_id: mongoose.Types.ObjectId(id)}).exec();

      if(!foundProduct) return res.status(404).json({success: false, message: "Category does not exist."});

      if(req.body?.name) foundProduct.name = req.body.name;
      if(req.body?.description) foundProduct.description = req.body.description;
      if(req.body?.image) foundProduct.image = req.body.image;
      if(req.body?.price) foundProduct.price = req.body.price;
      if(req.body?.categoryID) {
         const newCategoryID = await Category.findOne({name: req.body.categoryID}).exec();
         foundProduct.categoryID = newCategoryID._id;
      }
      if(req.body?.countInStock) foundProduct.countInStock = req.body.countInStock;

      foundProduct.save();

      res.status(200).json({success: true, data: foundProduct});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const deleteProduct = async(req, res) => {
   const id = req.params?.id
   if(!id) res.status(400).json({message: "ID parameter is required"});

   try{
      await Order.deleteOne({product: mongoose.Types.ObjectId(id)}).exec();

      const result = await Product.deleteOne({_id: mongoose.Types.ObjectId(id)}).exec();

      if(!result) return res.status(400).json({success: false, message: "Cannot delete product"});

      res.status(200).json({success:true, data: result});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

module.exports = {
   getAllProduct,
   getProduct,
   addNewProduct,
   updateProduct,
   deleteProduct
}