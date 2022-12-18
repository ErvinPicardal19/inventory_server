const router = require('express').Router();
const {
   getAllProduct,
   getProduct,
   addNewProduct,
   updateProduct,
   deleteProduct
} = require('../../../controller/product/productController');

router.route('/')
   .get(getAllProduct)
   .post(addNewProduct)

router.route('/:id')
   .get(getProduct)
   .put(updateProduct)
   .delete(deleteProduct)


module.exports = router;