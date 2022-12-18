const router = require('express').Router();
const {deleteUser,getAllUsers,getUser,updateUser} = require('../../../controller/handleUser');
// const ROLES = require('../../../../test_data/roles.json');
// const verifyRoles = require('../../../middleware/verifyRoles.js');

router.route('/')
   .get(getAllUsers)

router.route('/:id')
   .get(getUser)
   .put(updateUser)
   .delete(deleteUser)

module.exports = router;