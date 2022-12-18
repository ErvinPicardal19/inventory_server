const router = require('express').Router();
const {
   addNewOrder,
   deleteOrder,
   getAllOrders,
   getOrder,
   updateOrder
} = require('../../../controller/orders/ordersController');


router.route('/')
   .get(getAllOrders)
   .post(addNewOrder)

router.route('/:id')
   .get(getOrder)
   .put(updateOrder)
   .delete(deleteOrder)

module.exports = router;
