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

const userController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = new userModel({name: name, email: email, password: password});
    
            await user.save();
    
            const token = jwt.sign({ "email": user.email, "lists": user.lists }, 'secret', { expiresIn: "1h"});
    
            res.cookie("token", token, {httpOnly: true});
            return res.redirect('/menu');
        } catch (err) {
            console.error(err);
        }
    
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email: email });
    
            if(!user || user.password !== password) {
                return res.status(401).send('Email ou senha incorretos');
            }

            const token = jwt.sign({ "email": user.email, "lists": user.lists }, 'secret', { expiresIn: "1h"});
    
            res.cookie("token", token, {httpOnly: true});
            res.redirect('/menu');
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = userController;