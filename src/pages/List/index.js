/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { client } from '../../config/ApolloClient';
import { getPokemonsListRequest, getPokemonsListSuccess, getPokemonsListError } from '../../store/actions/pokemons.actions';
import AppBar from '../../components/AppBar';
import PokeCard from '../../components/PokeCard';
import { CircularProgress, Grid } from '@material-ui/core';
import store from '../../store';
import { GET_POKEMONS } from '../../config/queries';
import { useQuery } from '@apollo/react-hooks';

function List(props) {
  const { loading, data } = useQuery(GET_POKEMONS, {
    variables: {
      count: 20,
    },
  });
  let count = 20;
  const dispatch = useDispatch();
  let pokemonsStore = useSelector(store => store.pokemonsReducer);
  
  const handleScroll = useCallback(() => {
    if (((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300)) && !store.getState().pokemonsReducer.loading) {
      dispatch(getPokemonsListRequest());
      client.query({
        query: GET_POKEMONS,
        variables: {
          count: count + 10
        }
      }).then(response => {
        dispatch(getPokemonsListSuccess(response.data.pokemons));
        count = count + 10;
      }).catch(error => {
        console.log(error)
        dispatch(getPokemonsListError('Ocorreu um erro ao buscar os pokemons!'))
      });
    }
  });

  useEffect(() => {
    dispatch(getPokemonsListRequest());
    if(!loading) {
      dispatch(getPokemonsListSuccess(data.pokemons));
    }
    // client.query({
    //   query: GET_POKEMONS,
    //   variables: {
    //     count: count
    //   }
    // }).then(response => {
    //   dispatch(getPokemonsListSuccess(response.data.pokemons));
    // }).catch(err => dispatch(getPokemonsListError('Ocorreu um erro ao buscar os pokemons!')));
    window.addEventListener('scroll', () => handleScroll(pokemonsStore));
  }, []); 
  
  return (
    <>
      <AppBar history={props.history} />
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {pokemonsStore.pokemons.length > 0 && 
        
        pokemonsStore.pokemons.map((pokemon, index) => (
            <PokeCard
              key={pokemon.id.toString()} 
              id={pokemon.id} 
              name={pokemon.name} 
              image={pokemon.image} 
              number={pokemon.number} 
              types={pokemon.types}
              history={props.history}
            />
        ))}
        </Grid>
        {pokemonsStore.loading &&
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <CircularProgress color="secondary" data-testid="loading-page"/>
          </div>
        }
    </>
  );
}

export default List;