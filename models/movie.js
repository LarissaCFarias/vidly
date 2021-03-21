const joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({
  title:{
    type:String,
    required:true,
    trim:true,
    minlength:5,
    maxlength:255
  },
  numberInStock: {type: Number, required:true, min:0, max:255},
  dailyRentalRate: {type: Number, required:true, min:0, max:255},
  genre:{type: genreSchema, required:true}
}));


function validateMovies(movie) {
  const schema = {
    title: joi.string().min(3).required(),
    genreId: Joi.objectId().required(),
    numberInStock:joi.number().min(0).required(),
    dailyRentalRate:joi.number().min(0).required()
  };
  return joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovies;