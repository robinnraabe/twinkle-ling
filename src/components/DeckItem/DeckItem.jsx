import React from 'react';
import { Card, CardMedia, CardContent, CardActions,
  Grid, Button } from '@mui/material';

// This displays each deck on the UserPage
function DeckItem(props) {

  const quickStudy = () => {
    // this will link to Learning/Review page and load deck for studying
  }

  return (
    <Grid item m={3}>
      <Card onClick={props.toDeck} sx={[ 
        {maxWidth: '200px'},
        {marginTop: '10px'},
        {display: 'flex'}, 
        {flexDirection: 'column'},
        {borderRadius: '10px'}, 
        {backgroundImage: `white`},
        {boxShadow: '-2px 2px 10px 5px teal'},
        {'&:hover': {
            opacity: .5
        }}
      ]}>
        <CardMedia sx={{ width: 'auto' }}>
          <img src={props.deck.image_url} />
        </CardMedia>
        <CardContent sx={{ padding: '0px' }}>
          <h3>{props.deck.title}</h3>
          <h5>{props.deck.language}</h5>
        </CardContent>
        <CardActions>
          <Button variant='contained' onClick={quickStudy}>
            {props.deck.review_status ?
              // Shows by default
              'Review'
              :
              // Shows only if the deck hasn't been studied yet
              'Learn'
            }
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default DeckItem;