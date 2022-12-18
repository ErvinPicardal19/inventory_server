const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true
   },
   username: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   roles: {
      type: Number,
      default: 1000
   },
   name: {
      type: String,
      required: true
   },
   phone: {
     type: String,
     required: [true, 'User phone number required']
   },
   profile: {
      type: String,
      default: "https://malasakit-api.onrender.com/images/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
   },
   street: {
      type: String,
      required: true
   },
   city: {
      type: String,
      required: true
   },
   state: {
      type: String,
      required: true
   },
   zip: {
      type: Number,
      required: true
   },
   isActive: {
      type: Boolean,
      default: false
   },
   refreshToken: String
});

module.exports = mongoose.model('user', userSchema);

