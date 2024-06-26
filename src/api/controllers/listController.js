const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Local Modules
const userModel = require('../models/user.js');

// Server Initialization
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

const listController = {
    addNewList: async (req, res) => {
        console.log(document.cookie);
        const { name, items } = req.body;
    },
}

module.exports = listController;