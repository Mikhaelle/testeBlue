const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Pokemon = require('../models/pokemon')
const axios = require('axios')


const getPokemons = async (req, res, next) => {
    let pokemons
    try {
        pokemons = await Pokemon.find()
    } catch (err) {
        const error = new HttpError("somethin went wrong", 500)
        return next(error)
    }
    res.json({ pokemons: pokemons.map((pokemon) => pokemon.toObject({ getters: true })) })
}

const createPokeApi = async (req, res, next) => {
    let pokemonsResponse
    try {
        pokemonsResponse = await axios.get('https://pokeapi.co/api/v2/pokedex/kanto/')

    } catch (error) {
        console.error(error)
    }

    const pokemons = pokemonsResponse.data.pokemon_entries
    pokemons.map(async (pokemon) => {
        const name = pokemon.pokemon_species.name
        const pokeId = pokemon.entry_number
        let baseExperienceResponse
        let baseExperience
        try {
            baseExperienceResponse = await axios.get("https://pokeapi.co/api/v2/pokemon/" + pokeId)
            baseExperience = baseExperienceResponse.data.base_experience
        } catch (error) {
            console.error(error)
        }

        const createdPokemon = new Pokemon({
            name,
            baseExperience,
        })

        try {
            await createdPokemon.save()
        } catch (err) {
            const error = new HttpError(
                'Creating pokemon failed, please try again.',
                500
            )
            return next(error)
        }
    })

    res.status(201).json("Pokemons Update")
}

exports.getPokemons = getPokemons
exports.createPokeApi = createPokeApi