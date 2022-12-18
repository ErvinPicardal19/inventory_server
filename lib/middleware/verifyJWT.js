const JWT = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
   const authHeader = req.headers?.authorization || req.headers?.Authorization;

   if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

   const accessToken = authHeader.split(" ")[1]


   JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, {
      algorithms: "HS256"
   }, (err, decoded) => {
      if(err) return res.sendStatus(403); //Forbidden

      req.username = decoded.userInfo.username
      req.roles = decoded.userInfo.roles

      next()
   })
}

module.exports = verifyJWT;