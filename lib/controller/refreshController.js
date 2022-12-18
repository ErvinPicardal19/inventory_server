const User = require('../models/Users.js');
const JWT = require('jsonwebtoken');

const handleRefreshToken = async(req, res) => {
   const cookies = req.cookies;
   // console.log(cookies.jwt);
   if(!cookies?.jwt) return res.sendStatus(401); //Unauthorized

   const refreshToken = cookies.jwt;

   try{
      const foundUser = await User.findOne({refreshToken: refreshToken}).exec();

      if(!foundUser) return res.sendStatus("403"); //Forbidden

      //Evaluate JWT'
      JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, {
         algorithms: "HS256"
      }, (err, decoded) => {
         if(err || foundUser.username !== decoded.userInfo.username) return res.sendStatus(401); //Unauthorized

         const roles = Object.values(foundUser.roles).filter(Boolean);

         const payload = {
            userInfo: {
               "username": foundUser.username,
               "roles": roles
            }
         }

         const accessToken = JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: "1m"
         });

         res.status(200).json({accessToken: accessToken, roles: roles, name: foundUser.name, email: foundUser.email, profile: foundUser.profile});
      })
   } catch(err) {
      res.status(500).json({error: err.message});
   }

   
}

module.exports = {handleRefreshToken}