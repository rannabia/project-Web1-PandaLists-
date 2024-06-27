// 3rd Party Modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Local Modules
const userController = require('./api/controllers/userController');
const listController = require('./api/controllers/listController');

// Server Initialization
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname + "/api/views")));

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
  
mongoose.connect('mongodb://localhost:27017/pandalists');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Conectado ao MongoDB');
});

function validateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).send('Token não pode ser vazio\n');
    }

    const userData = jwt.verify(token, 'secret');

    req.session.save(() => {
        req.session.userData = userData;
    });

    next();
}

// Routing
app.get('/', (req, res) => { res.render(path.join(__dirname + "/api/views/index")); });
app.get('/login', (req, res) => { res.sendFile(path.join(__dirname + "/api/views/login.html")); });
app.get('/register', (req, res) => { res.sendFile(path.join(__dirname + "/api/views/forms.html")); });
app.get('/menu', validateToken, (req, res,) => { res.sendFile(path.join(__dirname + "/api/views/menu.html")); });

app.post('/register', userController.register);
app.post('/login', userController.login);

app.post('/get-lists', listController.getLists);
app.post('/save-lists', listController.saveLists);

// Server listen 
app.listen(PORT, (err) => {
    if(err) {
        console.log('Erro ao inicializar o servidor');
    }

    console.log(`servidor iniciado com sucesso, aplicação escutando na porta ${PORT}`);
});