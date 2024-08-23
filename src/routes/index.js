const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.router');
const routerCart = require('./cart.router');
const verifyJwt = require('../utils/verifyJwt');
const routerPurchase = require('./Purchase.router');
const routerProductImg = require('./productImg.router');
const router = express.Router();

router.use('/users', routerUser)
router.use('/categories', routerCategory)
router.use('/products', routerProduct)
router.use('/carts', verifyJwt, routerCart)
router.use('/purchases', verifyJwt, routerPurchase)
router.use('/product-images', verifyJwt, routerProductImg)

module.exports = router;