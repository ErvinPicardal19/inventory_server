const bcrypt = require('bcrypt');
const User = require('../models/Users.js');

const handleNewUser = async(req, res) => {
   const {email, username, password, name, phone, roles, street, city, state, zip} = req.body;

   if(!email || !username || !password || !name || !phone || !street || !city || !state || !zip) return res.status(400).json({message: "Please provide credentials"}) //Unauthorized

   const foundUser = await User.findOne({$or: [{username: username}, {email: email}]}).exec();

   if(foundUser) return res.status(409).json({message: "User already exist"});

   try{
      const hashPassword = await bcrypt.hash(password, 10);

      const user = await new User({
         email: email,
         username: username,
         password: hashPassword,
         roles: roles,
         name: name,
         phone: phone,
         street: street,
         city: city,
         state: state,
         zip: Number(zip)
      }).save()


      res.status(200).json({success:true, data: user});

   } catch(err){

      res.status(500).json({message: err.message});
   }

} 


module.exports = {handleNewUser}