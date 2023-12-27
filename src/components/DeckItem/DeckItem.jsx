import React from 'react';
import { Card, CardMedia, CardContent, 
  Grid } from '@mui/material';

function DeckItem(props) {

  return (
    <Grid item m={3}>
      <Card sx={[ 
        {marginTop: '10px'},
        {display: 'flex'}, 
        {flexDirection: 'column'},
        {borderRadius: '10px'}, 
        {backgroundImage: `white`},
        {boxShadow: '-2px 2px 10px 5px rgb(90, 90, 90)'},
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
      </Card>
    </Grid>
  )
}

export default DeckItem;