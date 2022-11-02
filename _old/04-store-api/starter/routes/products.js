const express = require('express');
const router = express.Router();

const {
  getAllProductsStatic,
  getAllProducts,
  // createProduct,
  // getProduct,
  // updateProduct,
  // deleteProduct,
} = require('../controllers/products');

router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatic);

// router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
