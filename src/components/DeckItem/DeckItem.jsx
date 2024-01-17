import React from 'react';
import { Card, CardContent, CardActions,
  Grid, Box } from '@mui/material';

// This displays each deck on the UserPage
function DeckItem(props) {
  console.log(props.deck);

  const toLesson = () => {
    // this will link to Learning/Review page and load deck for studying
  }

  return (
    <Grid item m={3}>
      <Card sx={[ 
        {width: '200px'},
        {height: '270px'},
        {marginTop: '10px'},
        {display: 'flex'}, 
        {justifyContent: 'space-between'},
        {flexDirection: 'column'},
        {borderRadius: '0px'}, 
        {backgroundColor: `white`},
        {'&:hover': {
          opacity: .5
        }}
      ]}>
        {props.public ? 
          <CardActions sx={{ margin: '0px', marginLeft: '-10px', padding: '0px', flexDirection: 'column'}}>
            <img onClick={props.toDeck} src={props.deck.image_url} width='100%' height='120px' objectFit='fill' />
          </CardActions>
        :
          <CardActions sx={{ margin: '0px', marginLeft: '-10px', padding: '0px', flexDirection: 'column'}}>
            <img onClick={props.toDeck} src={props.deck.image_url} width='100%' height='120px' objectFit='cover' />
            <Box onClick={() => toLesson()} sx={{ backgroundColor: 'black', color: 'white', width: '100%', height: '40px', margin: '0px', padding: '20px 0px 0px 0px', textAlign: 'center', justifyItems: 'center' }}>
              Learn
            </Box>
          </CardActions>
        }
        <CardContent onClick={props.toDeck} sx={{ padding: '0px', margin: '0px', textAlign: 'center' }}>
          <h4 style={{ margin: '0px' }}>{props.deck.title}</h4>
          <h5 style={{ margin: '0px', fontWeight: '600', color: 'gray' }}>{props.deck.language}</h5>
          <h5 style={{ margin: '0px', fontWeight: '400', color: 'gray' }}>Created by {props.deck.creator}</h5>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default DeckItem;