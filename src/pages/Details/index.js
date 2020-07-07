import React, { useEffect, useState} from 'react';
import { GET_DETAILS_POKEMON } from '../../config/queries';
import { client } from '../../config/ApolloClient';
import 
  { Card,
    CardMedia, 
    CardContent,
    Typography, 
    Chip,
    Avatar,
    Button,
    CircularProgress
  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../../components/AppBar';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    margin: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: 800,
  },
  media: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    alignSelf: 'center',
    height: 290,
  },
  containerChip: {
    marginLeft: 25,
  },
  chip: {
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  textMarginLeft: {
    marginLeft: 20,
  },
  paperStyle: {
    backgroundColor: '#F51057',
    marginTop: 10,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    width: 140,
    marginLeft: 15
  },
  textWhite: {
    color: '#fff',
  },
  containerAttacks: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: 15,
  },
  rowEvolution: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 25,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 20
  },
  containerBody: {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 10
  }
}));

function Details(props) {
  const classes = useStyles();
  const [pokemonInfos, setPokemonInfos] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const pokemonsEdited = JSON.parse(localStorage.getItem('@pokemonsEdited'));
    if(!!pokemonsEdited) {
      const findPokemon = pokemonsEdited.find(pokemon => pokemon.id === props.match.params.id);
      if(findPokemon) { 
        setPokemonInfos(findPokemon);
        setLoading(false);
      } else {
        client.query({
          query: GET_DETAILS_POKEMON,
          variables: {
            id: props.match.params.id
          }
        }).then(response => {
          setPokemonInfos(response.data.pokemon);
          setLoading(false);
        }).catch(err => {
          setLoading(false);
        });
      }
    } else {
      client.query({
        query: GET_DETAILS_POKEMON,
        variables: {
          id: props.match.params.id
        }
      }).then(response => {
        setPokemonInfos(response.data.pokemon);
        setLoading(false);
      }).catch(err => {
        setLoading(false);
      });
    }
    
  }, [props]);
  return (
    <>
    <AppBar history={props.history} />
      <div className={classes.containerBody}>
        {loading ?
          <CircularProgress color="secondary" />
          :
          <Card className={classes.root}>
            <Button className={classes.backButton} onClick={() => props.history.goBack()}>
              <KeyboardBackspaceIcon />
                &nbsp;
                Voltar
              </Button>
              <Button className={classes.editButton} onClick={() => props.history.push('/edit', {
                pokemonInfos
              })}>
                Editar
              </Button>
              <CardMedia className={classes.media}>
                <img className={classes.image} src={pokemonInfos.image} alt="Pokemon" />
              </CardMedia>
              <CardContent>
                <Typography className={classes.textMarginLeft} gutterBottom variant="h2" component="h2">
                  {pokemonInfos.name}
                </Typography>
                <Typography className={classes.textMarginLeft} variant="h5" color="textPrimary" component="h5">
                  Tipos
                </Typography>
                <div className={classes.containerChip}>
                {!!pokemonInfos && pokemonInfos.types && pokemonInfos.types.map((type, index) => (
                    <Chip
                      className={classes.chip}
                      key={index.toString()}
                      color="secondary"
                      label={type}
                    />
                  ))}
                </div>
                <Typography className={classes.textMarginLeft} variant="h5" color="textPrimary" component="h5">
                  Resistencias
                </Typography>
                <div className={classes.containerChip}>
                {!!pokemonInfos && pokemonInfos.resistant && pokemonInfos.resistant.map((type, index) => (
                    <Chip
                      className={classes.chip}
                      key={index.toString()}
                      color="primary"
                      label={type}
                    />
                  ))}
                </div>
                <Typography className={classes.textMarginLeft} variant="h5" color="textPrimary" component="h5">
                  Ataques
                </Typography>
                <div className={classes.containerAttacks}>
                {!!pokemonInfos && pokemonInfos.attacks && pokemonInfos.attacks.special.map((attack, index) => (
                    <Card key={index.toString()} className={classes.paperStyle}>
                      <Typography className={classes.textWhite} variant="h6" color="inherit" component="h6">
                        {attack.name}
                      </Typography>
                      <Typography className={classes.textWhite} variant="body2" color="inherit" component="p">
                        Tipo: {attack.type}
                      </Typography>
                      <Typography className={classes.textWhite} variant="body2" color="inherit" component="p">
                        Dano: {attack.damage}
                      </Typography>
                    </Card>
                  ))}
                </div>
                <Typography className={classes.textMarginLeft} style={{ marginTop: 10}} variant="h5" color="textPrimary" component="h5">
                  Evoluções
                </Typography>
                  { !!pokemonInfos && pokemonInfos.evolutions && pokemonInfos.evolutions.map((evolution, index) => (
                    <Button className={classes.rowEvolution} key={index.toString()} onClick={() => {
                      props.history.push(`/details/${evolution.id}`);
                    }}>
                      <Avatar src={evolution.image} />
                      <Typography variant="h6" color="inherit" component="h6" style={{ marginLeft: 30 }}>
                        {evolution.number} - {evolution.name}
                      </Typography>
                    </Button>
                  ))}
              </CardContent>
          </Card>
        }
    </div>
    </>
  );
}

export default Details;