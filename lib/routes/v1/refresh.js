const router = require('express').Router();
const {handleRefreshToken} = require('../../controller/refreshController.js');

router.route('/')
   .post(handleRefreshToken);


module.exports = router;