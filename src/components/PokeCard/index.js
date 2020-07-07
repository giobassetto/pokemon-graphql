import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Card, 
    Chip, 
    CardActionArea, 
    CardActions, 
    CardContent, 
    CardMedia, 
    Button, 
    Typography
} from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    width: 400,
    margin: 20
  },
  media: {
    height: 300,
    width: 'initial',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    alignSelf: 'center',
    height: 290,
  },
  chip: {
    marginRight: 5,
  }
});

export default function PokeCard({ id, name, image, number, types, history}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} key={id}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
        >
          <img src={image} className={classes.image} alt="Pokemon" />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {number} - { name }
          </Typography>
            {types.map((type, index) => (
              <Chip
                className={classes.chip}
                key={index.toString()}
                color="secondary"
                label={type}
              />
            ))}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary" onClick={() => {
          history.push(`/details/${id}`);
        }}>
          Ver detalhes
        </Button>
      </CardActions>
    </Card>
  );
}