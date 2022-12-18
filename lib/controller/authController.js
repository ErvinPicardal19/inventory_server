const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Users.js');

const handleUserLogin = async(req, res) => {
   const {email, username, password} = req.body;

   if(!(email || username) && !password) return res.status(400).json({message: "Unauthorized Access Invalid Credentials"});

   const foundUser = await User.findOne({$or: [{username: username}, {email: email}]}).exec();
   console.log("Error Here");
   if(!foundUser) return res.status(401).json({message: "Unauthorized Access is Prohibited!"});

   try{
      const match = await bcrypt.compare(password, foundUser.password);

      if(match){

         const payload = {
            userInfo: {
               username: foundUser.username,
               roles: foundUser.roles
            }
         }
         
         const accessToken = JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: "5m"
         });

         const refreshToken = JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: "1d"
         });

         foundUser.refreshToken = refreshToken;
         foundUser.isActive = true;

         const result = await foundUser.save();

         const roles = Object.values(foundUser.roles).filter(Boolean);


         res.cookie('jwt', refreshToken, { 
            httpOnly: true, // Flags the cookie to be accessible only by the web server.
            sameSite: 'None', // Enable Cross-site
            maxAge: 24 * 60 * 60 * 1000, // Cookie Expire Time
            secure: true // Marks the cookie to be used with HTTPS only.
         });

         res.status(200).json({accessToken: accessToken, roles: foundUser.roles, name: foundUser.name, email: foundUser.email, profile: foundUser.profile, _id: foundUser._id});
      } else {
         res.status(401).json({message: "Unauthorized Access Invalid Credentials"});
      }
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

module.exports = {handleUserLogin}