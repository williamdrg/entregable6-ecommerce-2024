const { createPurchase, getAllPurchases } = require('../controllers/purchases.controllers');
const express = require('express');

const routerPurchase = express.Router();

routerPurchase.route('/')
  .get(getAllPurchases)
  .post(createPurchase);

module.exports = routerPurchase;