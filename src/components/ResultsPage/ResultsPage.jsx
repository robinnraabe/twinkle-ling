import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Stack, Tooltip, IconButton, Button, MenuItem, InputLabel, FormControl, FormHelperText, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProgressBar from '../ProgressBar/ProgressBar';

function ResultsPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [promptAnswer, setPromptAnswer] = useState({});
  const promptList = useSelector(store => store.prompts);
  const answerList = useSelector(store => store.answers);

  // Returns user to the deck details page for the selected deck
  const exitSession = () => {
    history.push('/deck/details');
  }

  // This will get the new session and send user to StudyPage
  const getSession = (type) => {

  }

  // Sets prompt ID for GET route, gets answers for answer selector
  const handleChange = (key) => (event) => {
    setPromptAnswer({...promptAnswer, 
      [key]: event.target.value
    }); 

    if (key === 'prompt_id') {
      const action = { type: 'FETCH_ANSWERS', payload: event.target.value};
      dispatch(action);
    }
  }


  
  useEffect(() => {
    dispatch({type: 'FETCH_PROMPTS'})
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
            <Tooltip title="End Session">
              <CloseIcon sx={{fontSize: '80px'}} />   
            </Tooltip>
          </IconButton>
        </Stack>
      </Box>

      {/* Main */}
      <h1 style={{ textAlign: 'center' }}>Lesson complete!</h1>
      <br />
      <Stack direction='row' width='100%' justifyContent='space-between'>

        {/* Progress */}
        <Stack direction='column' width='100%' justifyItems='center' alignItems='center' margin='0px 100px'>
          <Stack spacing={0} direction='column' width='100%' justifyItems='center' alignItems='center'
            sx={{ backgroundColor: 'white', padding: '20px' }}>
            Here's your progress so far:
            <ProgressBar fillColor="gold" progress={`${30}%`} height={30} />
            <h5>Words reviewed: 0</h5>
            <h5>Words remaining: 0</h5>
          </Stack>
          <br />
          <Button variant='contained' onClick={() => getSession(type)}>Next Lesson</Button>
        </Stack>

        {/* Learning settings */}
        <Stack direction='column' spacing={2} sx={{marginRight: '50px', backgroundColor: 'white', padding: '20px'}}>
          <h4>Learning Settings</h4>
          <p style={{ color: 'gray', fontSize: '12px' }}>*leave blank to keep current settings</p>
          <Select sx={{ 
            margin: '0px 3px', 
            width: '200px'  }}
            value={promptAnswer.prompt_id}
            label='Prompt'
            onChange={(e) => { handleChange('prompt_id') }}>
            {promptList.map(prompt => {
              return (
                <MenuItem 
                  key={prompt.id} 
                  value={prompt.id}>
                    {prompt.prompt}
                </MenuItem>
              );
            })}
          </Select>

          {promptAnswer.prompt_id != null ?
            // Allows answer selection
            <FormControl sx={{ m: 1, minWidth: 120 }} >
              <InputLabel>Answer</InputLabel>
              <Select sx={{ 
                margin: '0px 3px', 
                width: '200px' }}
                value={promptAnswer.answer_id}
                label='Answer'
                onChange={(e) => { handleChange('answer_id') }}>
                {answerList.map(answer => {
                  return (
                    <MenuItem 
                      key={answer.id} 
                      value={answer.id}>
                        {answer.answer}
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
                value={promptAnswer.answer_id}
                label='Answer'
                onChange={(e) => { handleChange('answer_id') }}>
                {answerList.map(answer => {
                  return (
                    <MenuItem 
                      key={answer.id} 
                      value={answer.id}>
                        {answer.answer}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Prompt Required</FormHelperText>
            </FormControl>
          }
          <Button variant='contained' onClick={() => getSession('review')}>Review</Button>
          <Button variant='contained' onClick={() => getSession('learn')}>Learn</Button>
        </Stack>
      </Stack>
    </div>
  );
}

export default ResultsPage;