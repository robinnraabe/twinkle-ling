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
  const deck = useSelector(store => store.deckDetails[0]);
  const deckId = deck.id;
  const languageId = deck.language_id;

  // Sends the user back to UserDeckList page
  const toUserDeckList = () => {
    history.push('/decks');
  }

  // Sends the user to the EditDeck page
  // need to figure out how to create a page for each deck...
  const toEditDeck = () => {
    axios.get(`/deck/${deckId}`)
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
    axios.get(`/chapters/${deckId}`)
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
        deck_id: deckId,
        title: '-- New Chapter',
        user_id: user.id
      };
      dispatch({ type: 'ADD_CHAPTER', payload: newChapter });
      getChapterDetails();
    }
  }

  // This gets extra items for study session
  const getExtraItems = () => {
    axios.get(`/items/language/${languageId}`).then(response => {
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
      axios.get(`/study/deck/learn/${deckId}`).then(response => {
        dispatch({ type: 'SET_LESSON', payload: response.data });
      })
        .catch(error => {
          console.log('Error getting deck learning:', error);
          alert('Something went wrong!');
        })
    }

    else if (type === 'review') {
      axios.get(`/study/deck/review/${deckId}`).then(response => {
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
      deckId: deckId,
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
    color: 'lavender',
    padding: '20px',
    backgroundImage: `url('${deck.image_url}')`,
    backgroundSize: '250px',
    backgroundRepeat: 'repeat'
  }

  const btnStyle = {
    color: 'white',
    margin: '5px 0px'
  }

  useEffect(() => {
  }, []);

  // Displays the information for the selected Deck
  return (
    <div data-testid="deckDetails" className='white'>
      {/* Top subheader */}
      <Stack direction='row' justifyContent='space-between' >

        {/* Left subheader items */}
        <Stack direction='row' alignItems='center' margin='0px 50px'>
          <img src='https://static.tumblr.com/d7d601c9f738a1e6098326472def2cac/zd84lno/qI6p0mf8w/tumblr_static_9tutvrt14iskcs04w448040wo.png' 
            style={{borderRadius: '200px'}} 
            width='80px' height='80px' />
          <Stack direction='column' justifyItems='center'>
            <h3 style={{ margin: '0px' }}>{deck.title}</h3>
            <h4 style={{ margin: '0px', fontWeight: 'normal' }}>Created by {deck.username}</h4>
          </Stack>
        </Stack>

        {/* Right subheader items */}
        <Stack alignItems='center'>
          <Button onClick={toUserDeckList}
            sx={{ margin: '0px 50px' }} 
            disableRipple
            variant='contained'>
            Return to decks
          </Button>
          <h4 style={{ margin: '0px', fontWeight: 'normal' }}>{deck.language}</h4>
        </Stack>
      </Stack>
      <br />

      {/* Stats and deck options */}
      <Box style={boxStyle} margin='0px 50px'>
        <Stack direction='row' justifyContent='space-between'>
          <Stack direction='column'>
            <Button variant='contained' style={btnStyle}
              onClick={() => toLesson('learn')}>
              Learn
            </Button>
            <Button variant='contained' style={btnStyle}
              onClick={() => toLesson('review')}>
              Review
            </Button>
          </Stack>

          <Stack direction='column'>
            { user.id === deck.creator_id ?
              <Button variant='contained' style={btnStyle}
                onClick={() => toEditDeck()}>
                Edit Deck
              </Button>
            :
              <Tooltip title="You must be a creator or contributor to edit this deck">
                <Button variant='contained' sx={{ backgroundColor: 'lightgrey', color: 'grey' }}>
                  Edit Deck
                </Button>
              </Tooltip>
            }
              <Button variant='contained' style={btnStyle}
                onClick={() => resetProgress()}>
                Reset Progress
              </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Chapters header */}
      <Stack direction='row' justifyContent='space-between' sx={{ margin: '0px 50px'}}>
        <h1>Chapters</h1>
        {user.id === deck.creator_id ? 
          <Button sx={{ fontSize: '24px' }} onClick={addChapter}>+ New Chapter</Button>
        :
          <Tooltip title="You must be a creator or contributor to edit this deck">
            <Button sx={{ fontSize: '24px', color: 'gray' }} onClick={addChapter}>+ New Chapter</Button>
          </Tooltip>
        }   
      </Stack>
      
      <Grid container spacing={2}>
        {chapters.map((chapter) => {
          return <ChapterItem 
            key={chapter.id} 
            chapter={chapter} 
            deckId={deckId}
            creatorId={deck.creator_id}
            languageId={languageId} 
            getChapterDetails={getChapterDetails}/>
        })} 
      </Grid>
    </div>
  );
}

export default DeckDetails;