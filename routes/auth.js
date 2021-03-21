const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) =>{
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send('User incorrect');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('invalid email or password');
  const token = user.generateAuthToken();
  res.send(token);
});


function validate(req) {
  const schema = {
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;