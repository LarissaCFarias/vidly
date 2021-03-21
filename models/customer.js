const mongoose = require('mongoose');
const joi = require('joi');

const Customer = mongoose.model('Customers', mongoose.Schema({
  name:{
    type:String,
    required:true,
    minlength:5,
    maxlength:50
  },
  isGold: {type:Boolean,default:false},
  phone:{
    type: String,
    required:true,
    minlength:5
  }
}));

function validadeCustomer(customer) {
  const schema = {
    name: joi.string().min(5).required(),
    phone: joi.string().min(5).required(),
    isGold: joi.boolean()
  };
  return joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validadeCustomer;