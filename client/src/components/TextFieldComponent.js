import React, { useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

const TextFieldComponent = props => {
    const [currency, setCurrency] = React.useState('')
    const [usePokemons, setUsePokemons] = React.useState([])
    const [isUsed, setIsUsed] = React.useState(false)

    const handleChange = (event) => {
        setCurrency(event.target.value)
        props.onUsePokemon(event.target.value)
        setIsUsed(true)
    }
    useEffect(() => {
        setUsePokemons(props.pokemons)
    }, [])

    return (

        <TextField
            id="standard-select-currency"
            select
            label="Selecionado"
            value={currency}
            onChange={handleChange}
            helperText="Selecione o seu pokemon"
            disabled = {isUsed}
        >
            {
                usePokemons.map((pokemon, index) => (

                    pokemon.number !== 0 ?

                        <MenuItem key={index} value={index} disabled={pokemon.inUse}>
                            {pokemon.name}
                        </MenuItem> : null
                ))
            }
        </TextField >

    )
}

export default TextFieldComponent