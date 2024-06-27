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
        console.log(req.session.userData);
        const { name, items } = req.body;

        const user = await userModel.findOne({ email: req.session.userData.email });

        user.lists.push({ name: name, items: items });
        user.save(done);

        res.redirect('menu');
    },

    getLists: async (req, res) => {
        const user = await userModel.findOne({ email: req.session.userData.email });

        res.send(user.lists);
    },

    saveLists: async (req, res) => {
        const user = await userModel.findOne({ email: req.session.userData.email });

        user.lists = req.body.lists;
        user.save();
    }
}

module.exports = listController;