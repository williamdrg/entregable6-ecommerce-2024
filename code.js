console.log(require('crypto').randomBytes(64).toString('hex'))

const user = {
  firstName: "Iuvil",
  lastName: "Pena",
  email: "iuvil@gmail.com",
  password: "iuvil1234",
  phone: "+575312323"
}
const columns = ['firstName', 'lastName', 'email', 'password', 'phone']
columns.forEach((column) => {
  console.log(user[column])
  expect(res.body[column]).toBe(user[column])
})

const Cart = require("./Cart")
const Category = require("./Category")
const Product = require("./Product")
const ProductImg = require("./ProductImg")
const Purchase = require("./Purchase")
const User = require("./User")

Category.hasMany(Product)
Product.belongsTo(Category)

User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Cart, { foreignKey: 'productId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

User.belongsToMany(Product, { through: Purchase })
Product.belongsToMany(User, { through: Purchase })

Product.hasMany(ProductImg)
ProductImg.belongsTo(Product)
