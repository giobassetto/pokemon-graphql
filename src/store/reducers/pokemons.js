import { Actions } from '../actions/constants';
const initialState = {
  loading: false,
  pokemons: [],
  count: 20,
  error: null
};

export default function pokemonsReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_POKEMONS_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case Actions.GET_POKEMONS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        pokemons: [...action.payload.pokemons],
        count: 60
      };
    case Actions.GET_POKEMONS_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
