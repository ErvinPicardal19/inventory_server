const User = require('../models/Users.js');

const handleUserLogout = async(req, res) => {
   const cookies = req.cookies;

   if(!cookies?.jwt) return res.sendStatus(204); //No Content

   const refreshToken = cookies.jwt;

   const foundUser = await User.findOne({refreshToken: refreshToken}).exec();

   if(!foundUser) {
      res.clearCookie('jwt', {
         httpOnly: true,
         sameSite: 'None',
         secure: true
      })
      return res.sendStatus(204); //No content
   }
   console.log("Logging out...");
   foundUser.refreshToken = '';
   foundUser.isActive = false;
   console.log("User:", foundUser);
   const result = await foundUser.save();

   res.clearCookie('jwt', { 
      httpOnly: true, 
      sameSite: 'None',
      secure: true
   });

   res.sendStatus(204); // No content
}

module.exports = {handleUserLogout}