const router = require('express').Router();
const {
   getAllCategory,
   addNewCategory,
   updateCategory,
   deleteCategory,
   getCategory
} = require('../../../controller/categories/categoriesController');

router.route('/')
   .get(getAllCategory)     
   .post(addNewCategory);

router.route('/:id')
   .get(getCategory)
   .put(updateCategory)
   .delete(deleteCategory)

module.exports = router;