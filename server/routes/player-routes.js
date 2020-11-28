const express = require('express')
const { check } = require('express-validator')

const playerControllers = require('../controllers/player')

const router = express.Router()

router.post(
    '/',
    [
        check('name')
            .not()
            .isEmpty(),
    ],
    playerControllers.createPlayers
)

router.post(
    '/add',
    playerControllers.addPokemonNumber
)

router.get('/', playerControllers.getPlayers)


module.exports = router