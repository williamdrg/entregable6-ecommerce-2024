const Cart = require("./Cart")
const Category = require("./Category")
const Product = require("./Product")
const ProductImg = require("./ProductImg")
const Purchase = require("./Purchase")
const User = require("./User")

Category.hasMany(Product)
Product.belongsTo(Category)

User.belongsToMany(Product, { through: Cart })
Product.belongsToMany(User, { through: Cart })

Cart.belongsTo(User);
Cart.belongsTo(Product);

User.belongsToMany(Product, { through: Purchase })
Product.belongsToMany(User, { through: Purchase })

Product.hasMany(ProductImg)
ProductImg.belongsTo(Product)
