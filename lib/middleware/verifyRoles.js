const verifyRoles = (allowedRoles) => {
   return (req, res, next) => {

      if(!req.roles) return res.sendStatus(401); // Unauthorized

      const isAllowed = req.roles.map((role) => {
         return allowedRoles.includes(role)
      }).find((val) => val === true);

      if(!isAllowed) return res.sendStatus(401); // Unauthorized

      next();
   }
}

module.exports = verifyRoles;