import React, { useState } from 'react';
import AppBar from '../../components/AppBar';
import { Card, CardContent, CardMedia, TextField, Typography, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    margin: 20,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    maxWidth: 800
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
  inputRoot: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  typographyMargin: {
    margin: 15,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20
  },
}));

function Edit(props) {
  const classes = useStyles();
  const [pokemonInfos, setPokemonInfos] = useState(props.location.state.pokemonInfos);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      <AppBar history={props.history}/>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Pokemon editado com sucesso!
        </Alert>
      </Snackbar>
      <Card className={classes.root}>
      <Button className={classes.backButton} onClick={() => props.history.goBack()}>
        <KeyboardBackspaceIcon />&nbsp;
        Voltar
      </Button>
      <CardMedia className={classes.media}>
        <img className={classes.image} src={pokemonInfos.image} alt="Pokemon" />
      </CardMedia>
      <CardContent>
          <Typography className={classes.typographyMargin} variant="h5" component="h5">
            Informações básicas do Pokemon
          </Typography>
          <TextField 
            value={pokemonInfos.number} 
            onChange={(e) => {
              setPokemonInfos({...pokemonInfos, number: e.target.value });
            }}
            className={classes.inputRoot}
            label="Número" 
            variant="outlined" 
          />
          <TextField 
            value={pokemonInfos.name}
            onChange={(e) => {
              setPokemonInfos({...pokemonInfos, name: e.target.value });
            }}
            className={classes.inputRoot} 
            id="name-input"
            label="Nome" 
            variant="outlined" 
          />
          <TextField 
            value={pokemonInfos.maxHP} 
            onChange={(e) => {
              setPokemonInfos({...pokemonInfos, maxHP: e.target.value });
            }}
            className={classes.inputRoot} 
            label="HP" 
            variant="outlined" 
          />
          <Typography className={classes.typographyMargin} variant="h5" component="h5">
            Tipos
          </Typography>
          {pokemonInfos.types.map((type, index) => (
            <TextField 
              key={index.toString()}
              value={type} 
              onChange={(e) => {
                let types = pokemonInfos.types;
                types[index] = e.target.value;
                setPokemonInfos({...pokemonInfos, types });
              }}
              className={classes.inputRoot}
              label={`Tipo - ${index + 1}`} 
              variant="outlined" 
            />
          ))}
          <Typography className={classes.typographyMargin} variant="h5" component="h5">
            Resistências
          </Typography>
          {pokemonInfos.resistant.map((resistant, index) => (
            <TextField 
              key={index.toString()}
              value={resistant} 
              onChange={(e) => {
                let resistant = pokemonInfos.resistant;
                resistant[index] = e.target.value;
                setPokemonInfos({...pokemonInfos, resistant });
              }}
              className={classes.inputRoot}
              label={`Resistência - ${index + 1}`} 
              variant="outlined" 
            />
          ))}
          <Typography className={classes.typographyMargin} variant="h5" component="h5">
            Ataques
          </Typography>
          {pokemonInfos.attacks.special.map((attack, index) => (
            <div key={attack.name.toString()}>
              <TextField 
                value={attack.name}
                onChange={(e) => {
                  let attacks = pokemonInfos.attacks.special;
                  attacks[index].name = e.target.value;
                  setPokemonInfos({...pokemonInfos, attacks: {
                    special: attacks
                  } });
                }}
                className={classes.inputRoot}
                label="Nome do ataque" 
                variant="outlined"
              />
              <TextField 
                value={attack.type}
                onChange={(e) => {
                  let attacks = pokemonInfos.attacks.special;
                  attacks[index].type = e.target.value;
                  setPokemonInfos({...pokemonInfos, attacks: {
                    special: attacks
                  } });
                }}
                className={classes.inputRoot}
                label="Tipo do ataque" 
                variant="outlined"
              />
              <TextField 
                value={attack.damage}
                onChange={(e) => {
                  let attacks = pokemonInfos.attacks.special;
                  attacks[index].damage = e.target.value;
                  setPokemonInfos({...pokemonInfos, attacks: {
                    special: attacks
                  } });
                }}
                className={classes.inputRoot}
                label="Dano do ataque" 
                variant="outlined"
              />
            </div>
          ))}
        </CardContent>
        <Button variant="contained" color="secondary" onClick={() => {
          if(pokemonInfos === props.location.state.pokemonInfos) return;

          let itemsLocalStorage = JSON.parse(localStorage.getItem('@pokemonsEdited'));
            if(!itemsLocalStorage) {
              const saveArray = [];
              saveArray.push(pokemonInfos);
              localStorage.setItem('@pokemonsEdited', JSON.stringify(saveArray));
            } else {
              const findEqualPokemonEditing = itemsLocalStorage.findIndex(pokemon => pokemon.id === pokemonInfos.id);
              if(findEqualPokemonEditing) {
                itemsLocalStorage[findEqualPokemonEditing] = pokemonInfos;
              } else {
                itemsLocalStorage.push(pokemonInfos);
              }
              localStorage.setItem('@pokemonsEdited', JSON.stringify(itemsLocalStorage));
            }
            setOpenSnackbar(true);
          }}>
          Salvar
        </Button>
      </Card>
      </div>
    </>
  );
}

export default Edit;