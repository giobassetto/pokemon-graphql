import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import pokemonsReducer from './reducers/pokemons';

const reducers = combineReducers({
  pokemonsReducer,
});

const middleware = applyMiddleware(thunk);

const store = createStore(reducers, middleware);

export default store;
