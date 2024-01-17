import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Stack, Tooltip, IconButton, Button, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StudyItem from '../StudyItem/StudyItem';
import ProgressBar from '../ProgressBar/ProgressBar';

function StudyPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const deck = useSelector(store => store.deckDetails[0]);
  const user = useSelector(store => store.user);
  const lesson = useSelector(store => store.lesson);
  const [lessonLength] = useState(lesson.length);
  const lessonExtras = useSelector(store => store.lessonExtras);
  const [itemArray, setItemArray] = useState([]);
  const [checkItem, setCheckItem] = useState({});
  const [correct, setCorrect] = useState(0);
  const [missed, setMissed] = useState(0);
  const [skip, setSkip] = useState(false);
  const [splice, setSplice] = useState();

  // Checks if selected test option matches answer
  // Updates test item and all options for next question
  const checkAnswer = (itemId) => {
    if (checkItem.i_id === itemId) {
      lesson.splice(splice, 1);
      setCorrect(correct + 1);

      axios.put(`/items/set/correct`, [itemId])
        .catch((error) => {
          console.log('Error in StudyPage/checkAnswer/correct PUT request:', error);
          alert('Something went wrong!');
      })

      if (lesson.length > 0) {
        sessionItem();
      }
      else {
        setTimeout(() => {
          dispatch({ type: 'SET_CORRECT', payload: correct});
          dispatch({ type: 'SET_WRONG', payload: missed});
          history.push('/results');
        }, '1000');
      }
    }

    else {
      axios.put(`/items/set/wrong`, [checkItem.i_id])
        .catch((error) => {
          console.log('Error in StudyPage/checkAnswer/wrong PUT request:', error);
          alert('Something went wrong!');
      })

      sessionItem();
      setMissed(missed + 1);
    }
  }

  // Gets a random number
  const getRandom = (length) => {
    return Math.floor(Math.random() * length);
  }

  // Chooses next item + options in session
  const sessionItem = () => {
    // Picks one randomized item from 'lesson', removes index from 'lesson'
    let itemArray = [];
    let randomIndex = getRandom(lesson.length);
    let lessonItem = lesson[randomIndex];
    setCheckItem(lessonItem);
    setSplice(randomIndex);
    itemArray.push(lessonItem);
    let index = 5;

    // Creates new copy of 'lessonExtras' so 'lessonExtras' isn't affected
    const lessonExtrasCopy = [];
    for (let item of lessonExtras) {
      lessonExtrasCopy.push(item);
    }

    // Picks 5 randomized items from 'lessonExtrasCopy', removes each from lessonExtrasCopy
    while (index > 0) {
      let randomIndex = getRandom(lessonExtrasCopy.length);
      const extraItem = lessonExtrasCopy[randomIndex];
      let itemNotInArray = true;
      for (let item of itemArray) {
        if (item.item_id === extraItem.i_id) {
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
      itemArray.push(removedItem[0]);
    }

    setItemArray(itemArray);
  }

  const skipItem = () => {
    // reduce SR by 10%
    setSkip(true);
    setMissed(missed + 1);
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
            <h1>{deck.title}</h1>
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

      <Stack direction='row' width='100%' justifyContent='space-between'>
        <Stack spacing={0} direction='column' width='100%' justifyItems='center' alignItems='center' margin='0px 100px'>
          <ProgressBar fillColor="gold" progress={`${(correct/lessonLength)*100}%`} height={30} />
          <h1>{checkItem[user.prompt]}</h1> 
          <br />
          {/* Test options */}
          <Grid container spacing={2}>
            {itemArray.map((item) => {
                return <StudyItem key={item.i_id} item={item} user={user} checkAnswer={checkAnswer}/>
            })}
          </Grid>
        </Stack>

        {/* Right option bar, should probably be a toggle */}
        <Stack direction='column' spacing={2} sx={{marginRight: '50px'}}>
          <h4>Correct: {correct}</h4>
          <h4>Missed: {missed}</h4>
          {/* <Button variant='contained' onClick={() => skipItem()}>SKIP</Button>
          <Button variant='contained' onClick={() => setStatus('difficult')}>DIFFICULT</Button>
          <Button variant='contained' onClick={() => setStatus('known')}>KNOWN</Button> */}
          <Button variant='contained' onClick={() => showHint()}>SHOW HINT</Button>
        </Stack>
      </Stack>
    </div>
  );
}

export default StudyPage;