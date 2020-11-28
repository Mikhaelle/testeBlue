const mongoose = require('mongoose')
const Pokemon = require('../models/pokemon')
const Schema = mongoose.Schema

const playerSchema = new Schema({
    name: { type: String, required: true },
    pokemons: { type: Array, "default": [] },
})

module.exports = mongoose.model('Player', playerSchema)