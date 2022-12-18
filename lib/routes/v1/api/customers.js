const router = require('express').Router();
const {getAllCustomers, getCustomer, addNewCustomer, updateCustomer, deleteCustomer} = require('../../../controller/customers/customersController.js');
// const ROLES = require('../../../../test_data/roles.json');
// const verifyRoles = require('../../../middleware/verifyRoles.js');

router.route('/')
   .get(getAllCustomers)
   .post(addNewCustomer)

router.route('/:id')
   .get(getCustomer)
   .put(updateCustomer)
   .delete(deleteCustomer)

module.exports = router;