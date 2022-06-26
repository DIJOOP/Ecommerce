const express = require('express');
const {
	gettAllProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	getProdctDetails,
	createProductReview,
	getProductReviews,
	deleteReview,
	gettAdminProducts
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.get('/products', gettAllProducts);
router.get('/admin/products', isAuthenticatedUser, authorizeRoles('admin'), gettAdminProducts);
router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'), createProduct);
router.put('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.delete('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.get('/product/:id', getProdctDetails);
router.put('/review', isAuthenticatedUser, createProductReview);
router.get('/review', getProductReviews);
router.delete('/review', isAuthenticatedUser, deleteReview);

module.exports = router;
