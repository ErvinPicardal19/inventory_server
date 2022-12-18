const { default: mongoose } = require('mongoose');
const Category = require('../../models/Category');

const getAllCategory = async(req, res) => {
   try{
      const categoryList = await Category.find();

      res.status(200).json({success: true, data: categoryList});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const getCategory = async(req,res) => {
   const id = req.params?.id
   if(!id) res.status(400).json({message: "ID parameter is required"});

   try{
      const foundCategory = await Category.findOne({_id: mongoose.Types.ObjectId(id)}).exec();

      if(!foundCategory) return res.status(404).json({success: false, message: "Category does not exist."});

      res.status(200).json({success: true, data: foundCategory});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const addNewCategory = async(req,res) => {
   const {name, color} = req.body;
   if(!name) return res.status(404).json({success: false, message: `Category Name is required!`});

   try{

      const foundCategory = await Category.findOne({name: name}).exec();

      if(foundCategory) return res.status(409).json({success: false, message: `${name} already exist`});

      const category = await new Category({
         name: name,
         color: color
      }).save();

      res.status(200).json({success: true, data: category})

   } catch(err){
      res.status(500).json({message: err.message});
   }
}

const updateCategory = async(req,res) => {
   const id = req.params?.id
   if(!id) res.status(400).json({message: "ID parameter is required"});

   try {
      const foundCategory = await Category.findOne({_id: mongoose.Types.ObjectId(id)}).exec();

      if(!foundCategory) return res.status(404).json({success: false, message: "Category does not exist."});

      if(req.body?.name) foundCategory.name = req.body.name;
      if(req.body?.color) foundCategory.color = req.body.color;

      foundCategory.save();

      res.status(200).json({success: true, data: foundCategory});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const deleteCategory = async(req, res) => {
   const id = req.params?.id
   if(!id) res.status(400).json({message: "ID parameter is required"});

   try{
      const result = await Category.deleteOne({_id: mongoose.Types.ObjectId(id)}).exec();

      if(!result) return res.status(400).json({success: false, message: "Cannot delete category"});

      res.status(200).json({success:true, data: result});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

module.exports = {
   getAllCategory,
   addNewCategory,
   updateCategory,
   deleteCategory,
   getCategory
}