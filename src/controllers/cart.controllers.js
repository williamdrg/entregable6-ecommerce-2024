const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Category = require('../models/Category');

const getAll = catchError(async(req, res) => {
  const userId = req.user.id
  const results = await Cart.findAll({ where: { userId }, 
    include: [
      {
        model: Product,
        attributes: { exclude: ['createdAt', 'updatedAt']},
        include: [
          {
            model: Category,
            attributes: ['name']
          }
        ]
      }
    ]
  });
  return res.json(results);
});

const create = catchError(async(req, res) => {
  const userId = req.user.id
  const { productId, quantity } = req.body
  
  const product = await Product.findByPk(productId)
  if (!product) throw { status: 404, message: 'Product not found.' };

  const cart = await Cart.findOne({where: { userId, productId }})

  if (cart) {
    cart.quantity += quantity;
    await cart.save();
    return res.json(cart);
  } else  {
    const newCart = await Cart.create({ userId, productId, quantity })
    return res.status(201).json(newCart);
  }
});

const getOne = catchError(async(req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    if (userId !== parseInt(id))  throw { status: 404, message: 'You do not have permission to perform this action.' };

    const result = await Cart.findByPk(id , {
      where: { userId },
      include: [
        {
          model: Product,
          attributes: { exclude: ['updatedAt', 'createdAt'] },
          include: [
            {
              model: Category,
              attributes: ['name', 'id']
            }
          ]
        }
      ]
    });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const userId = req.user.id;
    const result = await Cart.destroy({ where: {userId} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
  const userId = req.user.id
  const { productId, quantity } = req.body
  const result = await Cart.update(
      {quantity},
      { where: { userId, productId }, returning: true }
  );
  if(result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}