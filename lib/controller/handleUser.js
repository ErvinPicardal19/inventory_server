const mongoose = require('mongoose');
const User = require('../models/Users.js');

const getAllUsers = async(req, res) => {
   try{
      const usersList = await User.find();

      res.status(200).json({success: true, data: usersList});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const getUser = async(req, res) => {
   const id = req.params?.id;

   if(!id) res.status(400).json({message: "ID parameter is required"});

   try{
      const foundUser = await User.findOne({_id: mongoose.Types.ObjectId(id)}).exec();

      if(!foundUser) return res.status(404).json({success: false, message: "User does not exist."});

      res.status(200).json({success: true, data: foundUser});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const updateUser = async(req, res) => {
   const id = req.params?.id
   if(!id) res.status(400).json({message: "ID parameter is required"});

   try {
      const foundUser = await User.findOne({_id: mongoose.Types.ObjectId(id)}).exec();

      if(!foundUser) return res.status(404).json({success: false, message: "User does not exist."});

      if(req.body?.email) foundUser.email = req.body.email;
      if(req.body?.username) foundUser.username = req.body.username;
      if(req.body?.password) foundUser.password = req.body.password;
      if(req.body?.roles) foundUser.roles = req.body.roles;
      if(req.body?.name) foundUser.name = req.body.name;
      if(req.body?.phone) foundUser.phone = req.body.phone;
      if(req.body?.profile) foundUser.profile = req.body.profile;

      foundUser.save();

      res.status(200).json({success: true, data: foundUser});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const deleteUser = async(req, res) => {
   const id = req.params?.id
   if(!id) res.status(400).json({message: "ID parameter is required"});

   try{
      const result = await User.deleteOne({_id: mongoose.Types.ObjectId(id)}).exec();

      if(!result) return res.status(400).json({success: false, message: "Cannot delete user"});

      res.status(200).json({success:true, data: result});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

module.exports = {
   getAllUsers,
   getUser,
   updateUser,
   deleteUser
}