require('../models')
const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
const path = require('path');
const Category = require('../models/Category');

const BASE_URL = '/api/v1/product_images';
const BASE_URL_LOGIN = '/api/v1/users/login';
let TOKEN
let productId
let category
let product
let productImgId

beforeAll(async () => {
  const user = {
    email: "juan@gmail.com",
    password: "juan1234"
  };
  
  const res = await request(app)
    .post(BASE_URL_LOGIN)
    .send(user);
  TOKEN = res.body.token;

  category = await Category.create({ name: 'ropa para dama' })
  
  const newProduct = {
    title: 'Jeans blue dama',
    description: 'lorem 20',
    price: 12.20,
    categoryId: category.id
  }

  product =  await Product.create(newProduct)
  productId = product.id
});

afterAll((async () => {
  await category.destroy()
  await product.destroy()
}))

test('POST -> BASE_URL, should upload a product image', async () => {
  const filePath = path.resolve(__dirname, '../assets/jest_logo.png')
  const res = await request(app)
    .post(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)
    .field('productId', productId) 
    .attach('image', filePath)
  productImgId = res.body.id

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty('url')
  expect(res.body).toHaveProperty('fileName')
  expect(res.body.productId).toBe(productId)
})

test('GET -> BASE_URL, should return all product images', async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeInstanceOf(Array)
  expect(res.body.length).toBeGreaterThan(0)
  expect(res.body[0]).toHaveProperty('url')
  expect(res.body[0]).toHaveProperty('productId')
})

test('DELETE -> BASE_URL/:id, should delete a product image', async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${productImgId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(204)
})

