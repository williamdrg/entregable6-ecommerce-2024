const { getAll, create, getOne, remove, update } = require('../controllers/cart.controllers');
const express = require('express');

const routerCart = express.Router();

routerCart.route('/')
  .get(getAll)
  .delete(remove)
  .put(update)
  .post(create);

routerCart.route('/:id')
  .get(getOne)

module.exports = routerCart;