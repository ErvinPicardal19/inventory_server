const router = require('express').Router();
const {handleNewUser} = require('../../controller/registerController.js');

router.route('/')
   .post(handleNewUser)

module.exports = router;