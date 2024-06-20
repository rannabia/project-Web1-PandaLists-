// 3rd Party Modules
const express = require('express');
const mongoose = require('mongoose');

// Local Modules
const authRoute = require('./routes/authRoute');

// Server Initialization
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routing
app.use('/auth', authRoute);

// Server listen and database connection
app.listen(PORT, (err) => {
    if(err) {
        console.log('Erro ao inicializar o servidor');
    }

    mongoose.connect('mongodb://localhost:27017/pandalists')
    .then(() => console.log('MongoDB conectado com sucesso'))
    .catch(err => console.log(err));

    console.log(`servidor iniciado com sucesso, aplicação escutando na porta ${PORT}`);
});