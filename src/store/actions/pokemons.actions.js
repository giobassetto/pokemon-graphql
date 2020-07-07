/* eslint-disable array-callback-return */
import { Actions } from './constants';

export const getPokemonsListRequest = () => {
  return {
    type: Actions.GET_POKEMONS_LIST_REQUEST,
  }
}

export const getPokemonsListSuccess = (pokemons) => {
  const pokemonsEdited = JSON.parse(localStorage.getItem('@pokemonsEdited'));
  if(!!pokemonsEdited) {
    pokemonsEdited.map(pokemonEdited => {
      pokemons.forEach(pokemon => {
        if(pokemon.id === pokemonEdited.id) {
          pokemon.name = pokemonEdited.name;
          pokemon.number = pokemonEdited.number;
          pokemon.types = pokemonEdited.types;
        }
      })
    })
  }
  return {
    type: Actions.GET_POKEMONS_LIST_SUCCESS,
    payload: { pokemons }
  }
}

export const getPokemonsListError = (error) => {
  return {
    type: Actions.GET_POKEMONS_LIST_SUCCESS,
    payload: { error }
  }
}
export const setCount = (value) => {
  return {
    type: Actions.SET_COUNT,
    payload: { value }
  }
}