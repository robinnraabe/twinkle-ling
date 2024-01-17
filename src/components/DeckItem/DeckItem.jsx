import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, CardActions,
  Grid, Box } from '@mui/material';

// This displays each deck on the UserPage
function DeckItem(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  // Gets 5 extra random items in the same language for study session
  const getExtraItems = () => {
    axios.get(`/items/language/${props.deck.language_id}`)
      .then(response => {
        dispatch({ type: 'SET_LESSON_EXTRAS', payload: response.data });
      })
      .catch(error => {
        console.log('Error in ChapterItem/getExtraItems GET request:', error);
        alert('Something went wrong!');
    })
  }

  // Gets deck details to pass to StudyPage
  const getDetails = () => {
    axios.get(`/deck/${props.deck.id}`)
      .then(response => {
        dispatch({ type: 'SET_DECK_DETAILS', payload: response.data });
      })
      .catch(error => {
        console.log('Error in DeckItem/getDetails GET request:', error);
        alert('Something went wrong!');
    })
  }

  // This sends the user to the Study page and loads the selected deck for studying
  const toLesson = () => {
    getDetails();
    let dispatched = false;
    axios.get(`/study/deck/review/${props.deck.id}`)
      .then(response => {
        if (response.data.length > 0) {
          dispatch({ type: 'SET_LESSON', payload: response.data });
          getExtraItems();
          setTimeout(() => {
            dispatched = true;
            history.push('/session');
          }, '500');
        }
      })
      .catch(error => {
        console.log('Error in UserDeckDetails/toLesson/review GET request:', error);
        alert('Something went wrong!');
    })
    if (dispatched === false) {
      axios.get(`/study/deck/learn/${props.deck.id}`)
      .then(response => {
        if (response.data.length > 0) {
          dispatch({ type: 'SET_LESSON', payload: response.data });
          getExtraItems();
          setTimeout(() => {
            history.push('/session');
          }, '500');
        }
      })
      .catch(error => {
        console.log('Error in UserDeckDetails/toLesson/learn GET request:', error);
        alert('Something went wrong!');
      })
    }
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