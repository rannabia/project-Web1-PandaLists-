const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name:{type: String, required: true},
    items: [{type: String}]
});

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}, 
    lists: [listSchema]
});

module.exports = mongoose.model('User', userSchema);