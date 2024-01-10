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
    
  }

  // Gets next item in session
  const sessionItem = () => {
    
    console.log('LESSON CONTAINS:', lesson);
    console.log('EXTRAS CONTAIN:', lessonExtras);
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



<Card onClick={() => checkAnswer()} sx={[ 
  {maxWidth: '200px'},
  {marginTop: '10px'},
  {display: 'flex'}, 
  {flexDirection: 'column'},
  {borderRadius: '10px'}, 
  {backgroundColor: 'white'}
]}></Card>