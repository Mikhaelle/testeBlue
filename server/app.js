const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose')

const pokemonRoutes = require('./routes/pokemon-routes')
const playerRoutes = require('./routes/player-routes')


app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

app.use('/api/pokemons/', pokemonRoutes);
app.use('/api/player/', playerRoutes);


app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose.connect('mongodb+srv://mikha:mikha@cluster0.jmvet.mongodb.net/<dbname>?retryWrites=true&w=majority').then(() => { app.listen(5000) }).catch(err => {
    console.log('error');
});
