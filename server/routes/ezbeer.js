const express = require('express');
const router = express.router();

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, mongoOptions);
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    eMail: {type: String, required: true, unique: true},
    dateCreated: {type: Number, default: Date.now},
    lastLogin: {type: Number, default: Date.now},
});

const recipeSchema = new Schema({
    user_id: {type: String, required: true}
})

const User = mongoose.model("User", userSchema);