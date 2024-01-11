import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Card, Stack, Tooltip, IconButton, Button, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function StudyPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const lesson = useSelector(store => store.lesson);
  const lessonExtras = useSelector(store => store.lessonExtras);
  let correct = 0;
  let missed = 0;

  // Checks if selected test option matches answer
  // Updates test item and all options for next question
  const checkAnswer = () => {
    if (true) {
      return true;
    }
  }

  // Gets a random number
  const getRandom = (length) => {
    return Math.floor(Math.random() * length);
  }

  // Gets next item in session
  const sessionItem = () => {
    console.log('LESSON CONTAINS:', lesson);
    console.log('EXTRAS CONTAIN:', lessonExtras);
    // Picks one randomized item from 'lesson', removes index from 'lesson'
    let itemArray = [];
    let randomIndex = getRandom(lesson.length);
    let lessonItem = lesson[randomIndex];
    lesson.splice(randomIndex, 1);
    itemArray.push(lessonItem);
    let index = 5;

    // Creates new copy of 'lessonExtras' so 'lessonExtras' isn't affected
    const lessonExtrasCopy = [];
    for (let item of lessonExtras) {
      lessonExtrasCopy.push(item);
    }

    // Picks 5 randomized items from 'lessonExtrasCopy', removes each from lessonExtrasCopy
    // make sure extras !== item!
    while (index > 0) {
      let randomIndex = getRandom(lessonExtrasCopy.length);
      const extraItem = lessonExtrasCopy[randomIndex];
      let itemNotInArray = true;
      for (let item of itemArray) {
        if (item.i_id === extraItem.i_id) {
          itemNotInArray = false;
        }
      }
      if (itemNotInArray) {
        itemArray.push(extraItem);
        lessonExtrasCopy.splice(randomIndex, 1);
        index -= 1;
      }
    }

    // Shuffles the item array
    let endIndex = itemArray.length;
    while (endIndex > 0) {
      let randomIndex = getRandom(endIndex);
      endIndex -= 1;
      let removedItem = itemArray.splice(randomIndex, 1);
      console.log(removedItem);
      itemArray.push(removedItem[0]);
    }
    console.log('itemArray:', itemArray);

    // map itemArray as cards on DOM
  }

  const skipItem = () => {
    // reduce SR by 10%

    sessionItem();
  }

  // Changes the SR status of item according to selected button
  const setStatus = (buttonValue) => {
    if (buttonValue === 'difficult') {
      // reduce SR by 5%
    }

    else if (buttonValue === 'known') {
      // set SR = 99%
    }

  }

  // Shows hint for item
  const showHint = (itemId) => {

  }

  // Returns user to the deck details page for the selected deck
  const exitSession = () => {
    history.push('/deck/details');
  }
  
  useEffect(() => {
    sessionItem();
  }, [])

  return (
    <div>
      {/* Header */}
      <Box sx={{ backgroundColor: '#00acb0', margin: '20px' }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' margin='20px'>
          <Stack direction='row' alignItems='center' justifyContent='space-between' padding='20px 0px' width= '32%'>
            <img src='https://www.jame-world.com/media/image/2011-06/4009.jpg' width='200px' />
            <h1>Session Title</h1>
          </Stack>
          <IconButton onClick={() => exitSession()}
            disableElevation
            disableRipple
            size="large"
            sx={{
              ml: 1,
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent"
              }
            }} >
            <Tooltip title="Close Editor">
              <CloseIcon sx={{fontSize: '80px'}} />   
            </Tooltip>
          </IconButton>
        </Stack>
      </Box>

      <Stack direction='row' width='100%' justifyContent='space-between'>
        {/* Test options */}
        <Grid item m={4}>
          Test Item
          <Card onClick={() => checkAnswer()} sx={[ 
            {maxWidth: '200px'},
            {marginTop: '10px'},
            {display: 'flex'}, 
            {flexDirection: 'column'},
            {borderRadius: '10px'}, 
            {backgroundColor: 'white'}
          ]}>test option</Card>
          <Card onClick={() => checkAnswer()} sx={[ 
            {maxWidth: '200px'},
            {marginTop: '10px'},
            {display: 'flex'}, 
            {flexDirection: 'column'},
            {borderRadius: '10px'}, 
            {backgroundColor: 'white'}
          ]}>test option</Card>
          <Card onClick={() => checkAnswer()} sx={[ 
            {maxWidth: '200px'},
            {marginTop: '10px'},
            {display: 'flex'}, 
            {flexDirection: 'column'},
            {borderRadius: '10px'}, 
            {backgroundColor: 'white'}
          ]}>test option</Card>
          <br />
          <Card onClick={() => checkAnswer()} sx={[ 
            {maxWidth: '200px'},
            {marginTop: '10px'},
            {display: 'flex'}, 
            {flexDirection: 'column'},
            {borderRadius: '10px'}, 
            {backgroundColor: 'white'}
          ]}>test option</Card>
          <Card onClick={() => checkAnswer()} sx={[ 
            {maxWidth: '200px'},
            {marginTop: '10px'},
            {display: 'flex'}, 
            {flexDirection: 'column'},
            {borderRadius: '10px'}, 
            {backgroundColor: 'white'}
          ]}>test option</Card>
          <Card onClick={() => checkAnswer()} sx={[ 
            {maxWidth: '200px'},
            {marginTop: '10px'},
            {display: 'flex'}, 
            {flexDirection: 'column'},
            {borderRadius: '10px'}, 
            {backgroundColor: 'white'}
          ]}>test option</Card>
        </Grid>
        {/* Right option bar, should probably be a toggle */}
        <Stack direction='column' spacing={2} sx={{marginRight: '50px'}}>
          <h4>Correct: {correct}</h4>
          <h4>Missed: {missed}</h4>
          <Button variant='contained' onClick={() => skipItem()}>SKIP</Button>
          <Button variant='contained' onClick={() => setStatus('difficult')}>DIFFICULT</Button>
          <Button variant='contained' onClick={() => setStatus('known')}>KNOWN</Button>
          <Button variant='contained' onClick={() => showHint()}>SHOW HINT</Button>
        </Stack>
      </Stack>
    </div>
  );
}

export default StudyPage;