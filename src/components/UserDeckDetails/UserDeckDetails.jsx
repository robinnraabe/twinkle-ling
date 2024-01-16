import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Stack, Box, Grid } from '@mui/material';
import ChapterItem from '../ChapterItem/ChapterItem';

// Displays the details for the selected deck
function DeckDetails() {
  const user = useSelector(store => store.user);
  const deck = useSelector(store => store.deckDetails[0]);
  const chapters = useSelector(store => store.chapters);
  const deckId = deck.id;
  const languageId = deck.language_id;
  const history = useHistory();
  const dispatch = useDispatch();
  const [updater, setUpdater] = useState(0);

  // Sends the user back to UserDeckList page
  const toUserDeckList = () => {
    history.push('/decks');
  }

  // Sends the user to the EditDeck page
  // need to figure out how to create a page for each deck...
  const toEditDeck = () => {
    axios.get(`/deck/${deckId}`).then(response => {
        dispatch({ type: 'SET_DECK_DETAILS', payload: response.data });
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

  // This gets the data for each chapter's progress bar
  const getProgressData = (chapterId) => {
    let learned, total;
    const userId = user.id;
    const request = {
      params: {
        chapterId: chapterId,
        userId: userId
      }
    }

    // This gets the number of learned items in chapter
    axios.get(`/data/progress`, request)
      .then(response => {
        learned = response.data;
      })
      .catch(error => {
        console.log('Error getting learned count:', error);
        alert('Something went wrong!');
    })

    // This gets the total number of items in chapter
    axios.get(`/data/total`, request)
      .then(response => {
        total = response.data;
      })
      .catch(error => {
        console.log('Error getting total count:', error);
        alert('Something went wrong!');
    })

    // This updates the chapter with 'learned' and 'total' numbers
    axios.put(`/chapters/learned/${chapterId}`, [learned, total, userId])
      .then(response => {
        getChapterDetails();
      })
      .catch(error => {
        console.log('Error updating ChapterItem/GetProgressData counts:', error);
        alert('Something went wrong!');
    })
  }
  
  // This executes getProgressData for each chapter on page load
  const updateChapterData = () => {
    for (let chapter of chapters) {
      getProgressData(chapter.id);
    }
  }

  // This adds a new chapter to the deck
  const addChapter = (event) => {
    event.preventDefault();
    const newChapter = { 
      deck_id: deckId,
      title: '-- New Chapter',
      user_id: user.id
    };
    dispatch({ type: 'ADD_CHAPTER', payload: newChapter });
    setTimeout(() => {
      // getChapterDetails();
    }, "500");
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

  const resetProgress = () => {
    // Update the learning and review progress in the database to equal 0
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
    getChapterDetails();
    updateChapterData();
  }, [updater]);

  // Displays the information for the selected Deck
  return (
    <div data-testid="deckDetails">
        {/* Top subheader */}
        <Stack direction='row' justifyContent='space-between' >

          {/* Left subheader items */}
          <Stack direction='row' alignItems='center' margin='0px 50px'>
              <img src='https://static.tumblr.com/d7d601c9f738a1e6098326472def2cac/zd84lno/qI6p0mf8w/tumblr_static_9tutvrt14iskcs04w448040wo.png' 
                  style={{borderRadius: '200px'}} 
                  width='80px' height='80px' />
              <Stack direction='column' justifyItems='center'>
                  <h3 style={{ margin: '0px' }}>{deck.title}</h3>
                  <h4 style={{ margin: '0px', fontWeight: 'normal' }}>{deck.username}</h4>
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
                    <Button variant='contained' style={btnStyle}
                        onClick={() => toEditDeck()}>
                        Edit Deck
                    </Button>
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
            <Button sx={{ fontSize: '24px' }} onClick={addChapter}>+ New Chapter</Button>
        </Stack>
        
        <Grid container spacing={2}>
            {chapters.map((chapter) => {
                return <ChapterItem 
                  key={chapter.id} 
                  chapter={chapter} 
                  deckId={deckId}
                  languageId={languageId} 
                  setUpdater={setUpdater}
                  updater={updater}
                  getChapterDetails={getChapterDetails}/>
            })} 
        </Grid>
    </div>
  );
}

export default DeckDetails;