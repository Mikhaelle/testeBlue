const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Player = require('../models/player')
const axios = require('axios')

const getPokemons = async () => {
    let pokemons = []

    return new Promise(async function (resolve, reject) {

        try {
            pokemonsResponse = await axios.get('http://localhost:5000/api/pokemons/')
            pokemons = pokemonsResponse.data.pokemons
        } catch (error) {
            console.error(error)
        }

        resolve(pokemons)

    })
}

const updatePokemons = async (pokemons) => {
    let updatePokemons = []
    return new Promise(async function (resolve, reject) {
        pokemons.forEach(pokemon => {
            var pokeObject = {}
            pokeObject["number"] = 1
            pokeObject["name"] = pokemon.name
            pokeObject["baseExperience"] = pokemon.baseExperience
            updatePokemons.push(pokeObject)
        })
        resolve(updatePokemons)

    })
}

const getPlayers = async (req, res, next) => {
    let players
    try {
        players = await Player.find()
    } catch (err) {
        const error = new HttpError("somethin went wrong", 500)
        return next(error)
    }
    res.json({ players: players.map((player) => player.toObject({ getters: true })) })
}

const addPokemonNumber = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const pokemonName = req.body.pokemonName;
    const player1Id = req.body.player1Id;
    const player2Id = req.body.player2Id;

    let player1
    try {
        player1 = await Player.findById(player1Id);
        let pokemonPlayer1 = await player1.pokemons.find(pokemon => pokemon.name === pokemonName);
        pokemonPlayer1.number += 1;
        let response = await Player.updateOne({ _id: player1._id, 'pokemons.name': pokemonName }, {
            '$set': {
                'pokemons.$.number': pokemonPlayer1.number
            }
        })
        console.log(response)
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update player pokemon.',
            500
        );
        return next(error);
    }

    let player2
    try {
        player2 = await Player.findById(player2Id);
        let pokemonPlayer2 = await player2.pokemons.find(pokemon => pokemon.name === pokemonName);
        if (pokemonPlayer2.number > 0) {
            pokemonPlayer2.number -= 1;
        }
        let response = await Player.updateOne({ _id: player2._id, 'pokemons.name': pokemonName }, {
            '$set': {
                'pokemons.$.number': pokemonPlayer2.number
            }
        })
        console.log(response)
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not get player.',
            500
        );
        return next(error);
    }

    try {
        await Player.save();
    } catch (err) {

    }
    res.status(200).json({ player1: player1.toObject({ getters: true }), player2: player2.toObject({ getters: true }) });
}


const createPlayers = async (req, res, next) => {
    const { name } = req.body

    const pokemons = await getPokemons()
    const upPokemons = await updatePokemons(pokemons)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }

    const createdPlayer = new Player({
        name: name,
        pokemons: upPokemons,
    })

    try {
        await createdPlayer.save()
    } catch (err) {
        const error = new HttpError(
            'Creating pokemon failed, please try again.',
            500
        )
        return next(error)
    }

    res.status(201).json({ Player: createdPlayer })
}

exports.createPlayers = createPlayers
exports.addPokemonNumber = addPokemonNumber
exports.getPlayers = getPlayers