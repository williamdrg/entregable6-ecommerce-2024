const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const getAll = catchError(async(req, res) => {
    const results = await User.findAll({ attributes: { exclude: ['password'] }});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await User.create(req.body);
    const userData = { ...result.dataValues }
    delete userData.password
    return res.status(201).json(userData);
});

const login = catchError(async(req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email }})
  if (!user) return res.status(404).json({ message: 'user not found' });

  const passwordIsValid = await bcrypt.compare(password, user.password)
  if (!passwordIsValid) return res.status(401).json({ message: 'Invalid password' })

  const userData = {...user.dataValues }
  delete userData.password
  const token = jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn: '1d' })
  return res.json({ ...userData, token });
})

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { firstName, lastName } = req.body
    const result = await User.update(
        { firstName, lastName },
        { where: { id }, returning: true }
    );

    if(result[0] === 0) return res.sendStatus(404);
   const updateUser = result[1][0].toJSON();
    delete updateUser.password
    return res.json(updateUser);
});

module.exports = {
    getAll,
    create,
    remove,
    update,
    login
}