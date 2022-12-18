const router = require('express').Router();
const {
   getAllDbSize
} = require('../../../controller/dashboard/dashboardController');

router.route('/')
   .get(getAllDbSize)

module.exports = router;