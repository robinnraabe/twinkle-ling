import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Stack, Box, Grid, Tooltip } from '@mui/material';
import ChapterItem from '../ChapterItem/ChapterItem';

// Displays the details for the selected deck
function DeckDetails() {
  const user = useSelector(store => store.user);
  const chapters = useSelector(store => store.chapters);
  const history = useHistory();
  const dispatch = useDispatch();
  const deck = useSelector(store => store.deckDetails);
  console.log(user);

  // Sends the user back to UserDeckList page
  const toUserDeckList = () => {
    setTimeout(() => {
      history.push('/decks');
    }, 500);
  }

  // Sends the user to the EditDeck page
  const toEditDeck = () => {
    axios.get(`/deck/${deck.id}`)
      .then(response => {
        dispatch({ type: 'SET_EDIT_DETAILS', payload: response.data });
        history.push('/deck/edit');
      })
      .catch(error => {
        console.log('Error getting deck details:', error);
        alert('Something went wrong!');
    })
  }

  // Gets details for all chapters in selected deck
  const getChapterDetails = () => {
    axios.get(`/chapters/${deck.id}`)
      .then(response => {
        dispatch({ type: 'SET_CHAPTER_DETAILS', payload: response.data });
      })
      .catch(error => {
        console.log('Error getting chapter details:', error);
        alert('Something went wrong!');
    })
  }

  // This adds a new chapter to the deck
  const addChapter = (event) => {
    if (user.id === deck.creator_id) {
      event.preventDefault();
      const newChapter = { 
        deck_id: deck.id,
        title: '-- New Chapter',
        user_id: user.id
      };
      dispatch({ type: 'ADD_CHAPTER', payload: newChapter });
      getChapterDetails();
    }
  }

  // This gets extra items for study session
  const getExtraItems = () => {
    axios.get(`/items/language/${deck.language_id}`).then(response => {
      dispatch({ type: 'SET_LESSON_EXTRAS', payload: response.data });
    })
      .catch(error => {
        console.log('Error getting extra items:', error);
        alert('Something went wrong!');
      })
  }

  // This sends the user to the Study page and loads the selected deck for studying
  const toLesson = (type) => {
    if (type === 'learn') {
      axios.get(`/study/deck/learn/${deck.id}`).then(response => {
        dispatch({ type: 'SET_LESSON', payload: response.data });
      })
        .catch(error => {
          console.log('Error getting deck learning:', error);
          alert('Something went wrong!');
        })
    }

    else if (type === 'review') {
      axios.get(`/study/deck/review/${deck.id}`).then(response => {
        dispatch({ type: 'SET_LESSON', payload: response.data });
      })
        .catch(error => {
          alert('Something went wrong!');
        })
    }
    getExtraItems();
    setTimeout(() => {
      history.push('/session');
    }, '500');
  }

 // This resets the progress for the deck
 const resetProgress = () => {
  const request = {
    params: {
      deckId: deck.id,
      userId: user.id
    }
  }
  // This resets learned_status
  axios.put(`/items/reset/deck/learned`, request)
    .catch((error) => {
      console.log('Error in UserDeckDetails/resetProgress/learned PUT request:', error);
      alert('Something went wrong!');
  });

  // This resets repetition
  axios.put(`/items/reset/deck/repetition`, request)
    .then((response) => {
      getChapterDetails();
      updateChapterData();
    })
    .catch((error) => {
      console.log('Error in UserDeckDetails/resetProgress/repetition PUT request:', error);
      alert('Something went wrong!');
});
}

  const boxStyle = {
    padding: '20px',
  }

  useEffect(() => {
    getChapterDetails();
  }, []);

  // Displays the information for the selected Deck
  return (
    <div data-testid="deckDetails" className='white'>
      <br />
      {/* Top subheader */}
      <Stack direction='row' justifyContent='space-between' margin='auto' width='76%' >

        {/* Left subheader items */}
        <Stack direction='row' alignItems='center' margin='0px 50px' >
          <img src={`${user.user_image}`} 
            style={{borderRadius: '200px'}} 
            width='80px' height='80px' />
          <Stack direction='column' justifyItems='center'>
            <h3 className='white' style={{ margin: '0px 0px 0px 20px' }}>{deck.title}</h3>
            <h4 className='white' style={{ margin: '0px 0px 0px 20px', fontWeight: 'normal' }}>{deck.language}</h4>
            <h4 className='white' style={{ margin: '0px 0px 0px 20px', fontWeight: 'normal' }}>Created by {deck.username}</h4>
          </Stack>
        </Stack>

        {/* Right subheader items */}
        <Stack alignItems='center'>
          <Button onClick={toUserDeckList}
            sx={{ margin: '30px 48px', height: '50px', width: '200px', borderRadius: '0px', 
            fontWeight: '600', backgroundColor: '#42d3ff', color: 'black' }} 
            disableRipple
            variant='contained'>
            ←  Back to decks
          </Button>
        </Stack>
      </Stack>
      <br />

      {/* Deck options */}
      <Box style={boxStyle} margin='auto' width='70%'>
        <Stack direction='row' justifyContent='space-between'>

            <Stack height='150px' direction='row' justifyContent='start'>
              <img src={`${deck.image_url}`} height='150px' style={{marginRight: '20px'}}/>
              { user.id === deck.creator_id ?
                <Button variant='contained' disableRipple
                  sx={{ marginRight: '20px', height: '150px', borderRadius: '0px', width: '110px',
                    fontWeight: '600', backgroundColor: '#42d3ff', color: 'black' }} 
                  onClick={() => toEditDeck()}>
                  Edit <br /> Deck
                </Button>
              :
                <Tooltip title="You must be a creator or contributor to edit this deck" placement='top'>
                  <Button variant='contained' disableRipple
                    sx={[ {marginRight: '20px'}, {borderRadius: '0px'}, {fontWeight: '600'}, 
                    {backgroundColor: 'lightgrey'}, {color: 'grey'}, {height: '150px'}, {width: '110px'},
                    {'&:hover': {backgroundColor: 'lightgrey' }} ]}>
                    Edit <br /> Deck
                  </Button>
                </Tooltip>
              }
              <Button variant='contained' disableRipple
                sx={{ marginRight: '20px', height: '150px', borderRadius: '0px', 
                  fontWeight: '600', backgroundColor: '#42d3ff', color: 'black' }} 
                onClick={() => resetProgress()}>
                Reset <br /> Progress
              </Button>
            </Stack>

          <Stack direction='column' height='150px' width='200px' justifyContent='space-between'>
            <Button variant='contained' disableRipple
              sx={{ marginRight: '20px', height: '65px', width: '200px', borderRadius: '0px', 
                fontWeight: '600', backgroundColor: '#42d3ff', color: 'black' }} 
              onClick={() => toLesson('learn')}>
              Learn
            </Button>
            <Button variant='contained' disableRipple
              sx={{ marginRight: '20px', height: '65px', width: '200px', borderRadius: '0px', 
                fontWeight: '600', backgroundColor: '#42d3ff', color: 'black' }} 
              onClick={() => toLesson('review')}>
              Review
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Chapters header */}
      <Stack direction='row' justifyContent='space-between' sx={{ width: '70%', margin: 'auto'}}>
        <h1 className='white'>Chapters</h1>
        {user.id === deck.creator_id ? 
          <Button sx={{ fontSize: '24px', color: '#42d3ff', fontWeight: '600' }} disableRipple onClick={addChapter}>+ New Chapter</Button>
        :
          <Tooltip title="You must be a creator or contributor to edit this deck" placement='top'>
            <Button sx={{ fontSize: '24px', color: 'gray', fontWeight: '600' }} disableRipple onClick={addChapter}>+ New Chapter</Button>
          </Tooltip>
        }   
      </Stack>
      
      <Grid container spacing={2}>
        {chapters.map((chapter) => {
          return <ChapterItem 
            key={chapter.id} 
            chapter={chapter} 
            deckId={deck.id}
            creatorId={deck.creator_id}
            languageId={deck.language_id} 
            getChapterDetails={getChapterDetails}/>
        })} 
      </Grid>
    </div>
  );
}

export default DeckDetails;