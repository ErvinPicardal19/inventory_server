const router = require('express').Router();
const {handleUserLogin} = require('../../controller/authController.js');

router.route('/')
   .post(handleUserLogin);


module.exports = router;