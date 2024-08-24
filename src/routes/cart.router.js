const { getAll, create, getOne, remove, update } = require('../controllers/cart.controllers');
const express = require('express');

const routerCart = express.Router();

routerCart.route('/')
  .get(getAll)
  .delete(remove)
  .post(create)
  .put(update)

routerCart.route('/:id')
  .get(getOne)

module.exports = routerCart;