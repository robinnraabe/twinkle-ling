import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Stack, Tooltip, IconButton, Button, MenuItem, InputLabel, FormControl, FormHelperText, Select, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProgressBar from '../ProgressBar/ProgressBar';

function ResultsPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const deck = useSelector(store => store.deckDetails[0]);
  const missed = useSelector(store => store.wrong);
  const correct = useSelector(store => store.correct) + 1;
  const [size, setSize] = useState(user.size);
  const [prompt, setPrompt] = useState(user.prompt);
  const [answer, setAnswer] = useState(user.answer);
  const [chooseAnswer, setChooseAnswer] = useState(false);
  const promptList = useSelector(store => store.prompts);
  const answerList = useSelector(store => store.answers);

  // Returns user to the deck details page for the selected deck
  const exitSession = () => {
    // This gets details for the selected deck
    axios.get(`/deck/${deck.id}`)
      .then(response => {
        dispatch({ type: 'SET_DECK_DETAILS', payload: response.data });

        // This gets details for all chapters in selected deck
        axios.get(`/chapters/${deck.id}`)
          .then(response => {
            dispatch({ type: 'SET_CHAPTER_DETAILS', payload: response.data });
          })
          .catch(error => {
            console.log('Error getting chapter details:', error);
            alert('Something went wrong!');
        })
        setTimeout(() => {
          history.push('/deck/details');
        }, 500);
      })
      .catch(error => {
        console.log('Error getting deck details:', error);
        alert('Something went wrong!');
    })
  }

  // Gets 5 extra random items in the same language for study session
  const getExtraItems = () => {
    axios.get(`/items/language/${deck.language_id}`)
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
    axios.get(`/deck/${deck.id}`)
      .then(response => {
        dispatch({ type: 'SET_DECK_DETAILS', payload: response.data });
      })
      .catch(error => {
        console.log('Error in DeckItem/getDetails GET request:', error);
        alert('Something went wrong!');
    })
  }

  // This will get the new session and send user to StudyPage
  const getSession = () => {
    if ((answer != null) && (prompt != null) && (size > 0)) {
      dispatch({ type: 'SET_USER_SETTINGS', payload: {prompt: prompt, answer: answer, size: size} });
    }
    setTimeout(() => {
      dispatch({ type: 'FETCH_USER' });
    }, '200');
    getDetails();
    let dispatched = false;
    axios.get(`/study/deck/review/${deck.id}`)
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
      axios.get(`/study/deck/learn/${deck.id}`)
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

  // Sets prompt ID for GET route, gets answers for answer selector
  const handlePromptChange = (value) => {
    setPrompt(value);
    setAnswer('');
    setChooseAnswer(true);
    const action = { type: 'FETCH_ANSWERS', payload: value.id};
    dispatch(action);
  }
  
  useEffect(() => {
    dispatch({type: 'FETCH_PROMPTS'})
  }, [])

  return (
    <div>
      {/* Header */}
      <Box sx={{ backgroundColor: '#42d3ff', margin: '20px' }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' margin='20px'>
          <Stack direction='row' alignItems='center' justifyContent='start' padding='20px 0px'>
            <img src='https://www.jame-world.com/media/image/2011-06/4009.jpg' width='200px' />
            <h1 style={{ marginLeft: '20px' }}>{deck.title}</h1>
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
            <Tooltip title="End Session">
              <CloseIcon sx={{fontSize: '80px'}} />   
            </Tooltip>
          </IconButton>
        </Stack>
      </Box>

      {/* Main */}
      <h1 className='white' style={{ textAlign: 'center' }}>Lesson complete!</h1>
      <br />
      <Stack direction='row' width='100%' justifyContent='space-between'>

        {/* Progress */}
        <Stack direction='column' width='100%' justifyItems='center' alignItems='center' margin='0px 100px'>
          <Stack spacing={0} direction='column' width='100%' justifyItems='center' alignItems='center'
            sx={{ backgroundColor: 'white', padding: '20px' }}>
            <h2 style={{ paddingBottom: '0px', marginBottom: '0px' }}>Accuracy: {(correct / (missed+correct)) * 100}%</h2>
            <ProgressBar fillColor="gold" progress={`${(correct / (missed+correct)) * 100}%`} height={30} />
            <h3 style={{ paddingTop: '0px', marginTop: '0px' }}>Words reviewed: {correct}</h3>
          </Stack>
          <br />
          <Button variant='contained' onClick={() => getSession()}>Next Lesson</Button>
        </Stack>

        {/* Learning settings */}
        <Stack direction='column' spacing={2} sx={{marginRight: '50px', backgroundColor: 'white', padding: '20px'}}>
          <h4>Learning Settings</h4>
          <p style={{ color: 'gray', fontSize: '12px' }}>*leave blank to keep current settings</p>
          <FormControl sx={{ m: 1, minWidth: 120 }} >
            <InputLabel>Prompt</InputLabel>
            <Select sx={{ 
              margin: '0px 3px', 
              width: '200px'  }}
              label='Prompt'
              value={prompt}
              onChange={e => { handlePromptChange(e.target.value) }}>
              {promptList.map(prompt => {
                return (
                  <MenuItem 
                    key={prompt.id} 
                    value={prompt}>
                      {prompt.prompt_label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {chooseAnswer ?
            // Allows answer selection
            <FormControl sx={{ m: 1, minWidth: 120 }} >
              <InputLabel>Answer</InputLabel>
              <Select sx={{ 
                margin: '0px 3px', 
                width: '200px' }}
                value={answer}
                label='Answer'
                onChange={(e) => { setAnswer(e.target.value) }}>
                {answerList.map(answer => {
                  return (
                    <MenuItem 
                      key={answer.id} 
                      value={answer}>
                        {answer.answer_label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            :
            // Answer selection is disabled until Prompt is chosen
            <FormControl sx={{ m: 1, minWidth: 120 }} disabled>
              <InputLabel>Answer</InputLabel>
              <Select sx={{ 
                margin: '0px 3px', 
                width: '200px' }}
                label='Answer'>
              </Select>
              <FormHelperText>Prompt Required</FormHelperText>
            </FormControl>
          }
          <FormControl sx={{ m: 1, minWidth: 120 }} disabled>
            <TextField sx={{ 
              margin: '0px 3px', 
              width: '200px' }}
              type='number'
              label='Size'
              value={size}
              onChange={e => setSize(e.target.value)} />
          </FormControl>
        </Stack>
      </Stack>
    </div>
  );
}

export default ResultsPage;