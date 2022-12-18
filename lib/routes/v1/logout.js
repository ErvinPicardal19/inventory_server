const router = require('express').Router();
const {handleUserLogout} = require('../../controller/logoutController.js');

router.route('/')
   .post(handleUserLogout)

module.exports = router;