import './App.css'
import MultilineTextFields from './components/MultilineTextFields'
import Button from '@material-ui/core/Button'
import React, { useEffect, useState } from 'react'
import ErrorModal from './components/errorModal'
import LoadingSpinner from './components/loadingSpinner'
import { Container } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [loadedPlayer, setLoadedPlayer] = useState([])
  const [selectPlayerPokemons1, setselectPlayerPokemons1] = useState([])
  const [selectPlayerPokemons2, setselectPlayerPokemons2] = useState([])
  const [baseExperience1, setbaseExperience1] = useState(0)
  const [baseExperience2, setbaseExperience2] = useState(0)



  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch('https://salty-anchorage-93388.herokuapp.com/api/player')
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)
        }
        setLoadedPlayer(responseData.players)
      } catch (err) {
        setError(err.message)
      }
      setIsLoading(true)
    }
    sendRequest()
    setselectPlayerPokemons1(selectPlayerPokemons1)
    setselectPlayerPokemons2(selectPlayerPokemons2)
  }, [])


  useEffect(() => {
    setbaseExperience1(baseExperience1)
  }, [baseExperience1])

  const errorHandler = () => {
    setError(null)
  }


  const updateSelectPlayerPokemon1 = (pokemonsUsed) => {
    let actual = selectPlayerPokemons1
    actual.push(pokemonsUsed)

    let baseExperience = 0
    let findedPokemon = loadedPlayer[0].pokemons.find(poke => poke.name === pokemonsUsed)
    if (findedPokemon) {
      baseExperience = findedPokemon.baseExperience
      setbaseExperience1((prevBase) => { return baseExperience = prevBase + baseExperience })
    }

  }
  const updateSelectPlayerPokemon2 = (pokemonsUsed) => {
    let actual = selectPlayerPokemons2
    actual.push(pokemonsUsed)
    setselectPlayerPokemons2(actual)
    let baseExperience = 0
    let findedPokemon = loadedPlayer[1].pokemons.find(poke => poke.name === pokemonsUsed)
    if (findedPokemon) {
      baseExperience = findedPokemon.baseExperience
      setbaseExperience2((prevBase) => { return baseExperience = prevBase + baseExperience })
    }
  }

  const makeChange = () => {
    if (Math.abs(baseExperience1 - baseExperience2) <= 30) {
      const player1Id = loadedPlayer[0].id
      const player2Id = loadedPlayer[1].id
      addPokemonToPlayer(player1Id, player2Id)
      console.log("trocaRealizada")
    }
  }

  const addPokemonToPlayer = (player1Id, player2Id) => {

    selectPlayerPokemons1.forEach(async (pokemon) => {
      if (pokemon !== "") {
        await requestAddPokemonToPlayer(player2Id, player1Id, pokemon,)
      }
    })
    selectPlayerPokemons2.forEach(async (pokemon) => {
      if (pokemon !== "") {
        await requestAddPokemonToPlayer(player1Id, player2Id, pokemon)
      }
    })

  }


  const requestAddPokemonToPlayer = async (player1Id, player2Id, pokemonName) => {

    try {
      const requestBody = JSON.stringify({
        player1Id,
        player2Id,
        pokemonName
      })
      const response = await fetch('https://salty-anchorage-93388.herokuapp.com/api/player/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody
      })
      const responseData = await response.json()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <React.Fragment>
          <ErrorModal error={error} onClear={errorHandler} />
          <Container className="welcomeHeader">
            <div className="welcomeTitle">Bem Vindo ao PokeChange! Selecione o seu pokemon.</div>
          </Container>

          {!isLoading && (
            <div className="center">
              <LoadingSpinner />
            </div>
          )}{!isLoading ? null :
            <div>
              <Paper elevation={3} >
                <div className="Title">{loadedPlayer[0].name}
                  <MultilineTextFields playerData={loadedPlayer[0]} playerPokemons={updateSelectPlayerPokemon1} />
                </div>
                <div className="baseExperience">
                  baseExperience: {baseExperience1}
                </div>
              </Paper>
              <div className="button" >
                <Button variant="contained" onClick={makeChange}>Realizar Troca</Button>
              </div>
              <Paper elevation={3} >
                <div className="Title">{loadedPlayer[1].name}
                  <MultilineTextFields playerData={loadedPlayer[1]} playerPokemons={updateSelectPlayerPokemon2} />
                </div>
                <div className="baseExperience">
                  baseExperience: {baseExperience2}
                </div>
              </Paper>
            </div>
          }
        </React.Fragment>
      </header>
    </div>
  )
}

export default App
