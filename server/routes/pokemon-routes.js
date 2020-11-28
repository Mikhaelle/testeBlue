const express = require('express')
const { check } = require('express-validator')

const pokemonControllers = require('../controllers/pokemon')

const router = express.Router()

router.get('/', pokemonControllers.getPokemons)

router.get('/pokeapi', pokemonControllers.createPokeApi)

module.exports = router