import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextFieldComponent from './TextFieldComponent';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '15ch',
    },
  },
}));

const MultilineTextFields = (props) => {
  const classes = useStyles();
  const [pokemons, setPokemons] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [pokemonInUse, setPokemonInUse] = React.useState('')



  useEffect(() => {
    setIsLoading(true)
    let pokemonData = []
    props.playerData.pokemons.forEach((pokemon) => {
      if (pokemon.number !== 0) {
        for (let index = 0; index < pokemon.number; index++) {
          pokemon.inUse = false;
          pokemonData.push(pokemon)
        }
      }
    })
    setPokemons(pokemonData)
    setIsLoading(false)
  }, [])


  useEffect(() => {
    props.playerPokemons(pokemonInUse)
  }, [pokemonInUse]);

  const addNewPokemonInUse = (usedPokemon) => {
    let pokemon = pokemons[usedPokemon];
    if (pokemon.number > 1) {
      pokemon.number -= 1
      pokemons[usedPokemon] = pokemon
    } else {
      pokemon.inUse = true
    }
    setPokemons((prevPokemons) => { return prevPokemons.concat(pokemon) })
    setPokemonInUse(pokemon.name)
  }




  return (

    <form className={classes.root} noValidate autoComplete="off">

      {isLoading ? null :
        <div>
          <TextFieldComponent pokemons={pokemons} onUsePokemon={addNewPokemonInUse} />
          <TextFieldComponent pokemons={pokemons} onUsePokemon={addNewPokemonInUse} />
          <TextFieldComponent pokemons={pokemons} onUsePokemon={addNewPokemonInUse} />
          <TextFieldComponent pokemons={pokemons} onUsePokemon={addNewPokemonInUse} />
          <TextFieldComponent pokemons={pokemons} onUsePokemon={addNewPokemonInUse} />
          <TextFieldComponent pokemons={pokemons} onUsePokemon={addNewPokemonInUse} />
        </div>}

    </form>
  )
}
export default MultilineTextFields;