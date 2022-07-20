const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    pid  : Number,
    pname: String,
    price  : Number,
    description: String
  });

module.exports = mongoose.model('products', productsSchema,'products');
