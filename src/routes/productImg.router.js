const { getAllProductImages, uploadProductImage, deleteProductImage } = require('../controllers/productImg.controllers');
const express = require('express');
const upload = require('../utils/uploadFiles');

const routerProductImg = express.Router();

routerProductImg.route('/')
  .get(getAllProductImages)
  .post(upload.single('image'), uploadProductImage);

routerProductImg.route('/:id')
  .delete(deleteProductImage)

module.exports = routerProductImg;