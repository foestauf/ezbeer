const mongoose = require('mongoose');

const { Schema } = mongoose;
// Create Schema
const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  brewerName: {
    type: String,
  },
  style: {
    type: String,
  },
  ingredients: {
    type: Array,
  },
  owner: {
    type: String,
    required: true,
  },
  lastModified: {
    type: '',
    required: false,
  },
  boilTime: {
    type: Number,
  },
  batchSize: {
    type: Number,
  },
  efficiency: {
    type: String,
  },
});
const Recipe = mongoose.model('recipes', RecipeSchema);

module.exports = Recipe;
