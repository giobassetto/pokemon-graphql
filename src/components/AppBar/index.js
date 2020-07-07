/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import useDebounce from '../../utils/useDebounce';
import { useDispatch } from 'react-redux';
import { getPokemonsListRequest, getPokemonsListSuccess } from '../../store/actions/pokemons.actions';
import { client } from '../../config/ApolloClient';
import { GET_POKEMONS } from '../../config/queries';



const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    cursor: 'pointer'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function AppBarComponent({ history }) {
  const [allPokemons, setAllPokemons] = useState([]);
  client.query({
    query: GET_POKEMONS,
    variables: {
      count: 151,
    }
  }).then(response => { 
    setAllPokemons(response.data.pokemons);
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);


  
  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchTerm) {
        // Set isSearching state
        dispatch(getPokemonsListRequest());
        // Fire off our API call
        const filteredPokemons = allPokemons.filter(pokemon => {
          if(pokemon.name.toLowerCase().indexOf(searchTerm) > -1) {
            return pokemon;
          }
        });

        dispatch(getPokemonsListSuccess(filteredPokemons));
        
      } else {
        dispatch(getPokemonsListRequest());
        client.query({
          query: GET_POKEMONS,
          variables: {
            count: 20,
          }
        }).then(response => { 
          dispatch(getPokemonsListSuccess(response.data.pokemons));
        });
      }
    },
    [ debouncedSearchTerm]
  );

  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap  onClick={() => {
              history.push('/');
            }}>
              Pokemons
            </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              id="search-input"
              placeholder="Procure..."
              onChange={e => setSearchTerm(e.target.value)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default AppBarComponent;