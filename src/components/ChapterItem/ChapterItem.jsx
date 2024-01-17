import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, Stack, CardContent, CardActions,
  Grid, Button, TextField, IconButton, Tooltip } from '@mui/material';
import ItemGrid from '../ItemGrid/ItemGrid';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ProgressBar from '../ProgressBar/ProgressBar';

// This displays each chapter on the UserDeckDetails page
function ChapterItem(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(store => store.user);
  const [newItem, setItem] = useState({ 
    chapter_id: props.chapter.id,
    deck_id: props.deckId,
    user_id: user.id
  });
  const [newTitle, setTitle] = useState(props.chapter.title);
  const [updateList, setUpdateList] = useState([]);
  let edit = props.chapter.edit;

  // Gets 5 extra random items in the same language for study session
  const getExtraItems = () => {
    axios.get(`/items/language/${props.languageId}`)
      .then(response => {
        dispatch({ type: 'SET_LESSON_EXTRAS', payload: response.data });
      })
      .catch(error => {
        console.log('Error in ChapterItem/getExtraItems GET request:', error);
        alert('Something went wrong!');
    })
  }

  // This sends the user to the Study page and loads the selected chapter for studying
  const toLesson = (type, chapterId) => {
    if (type === 'learn') {
      axios.get(`/study/chapter/learn/${chapterId}`).then(response => {
        dispatch({ type: 'SET_LESSON', payload: response.data });
      })
        .catch(error => {
          console.log('Error in ChapterItem/toLesson/learn GET request:', error);
          alert('Something went wrong!');
        })
    }

    else if (type === 'review') {
      axios.get(`/study/chapter/review/${chapterId}`).then(response => {
        dispatch({ type: 'SET_LESSON', payload: response.data });
      })
        .catch(error => {
          console.log('Error in ChapterItem/toLesson/review GET request:', error);
          alert('Something went wrong!');
        })
    }
    getExtraItems();
    setTimeout(() => {
      history.push('/session');
    }, '1000');
  }

  // This toggles the editor for the selected chapter
  const editChapter = (chapterId) => {
    axios.put(`/chapters/edit/${chapterId}`)
      .then((response) => {
        dispatch({ type: 'FETCH_CHAPTERS', payload: props.deckId })
        props.getChapterDetails();
      })
      .catch((error) => {
        console.log('Error in ChapterItem/editChapter PUT request:', error);
        alert('Something went wrong!');
    });
    setUpdateList([]);
  }

  // This resets the progress for the selected chapter
  const resetProgress = (chapterId) => {

    const request = {
      params: {
        chapterId: chapterId,
        userId: user.id
      }
    }
    // This resets learned_status
    axios.put(`/items/reset/learned`, request)
      .catch((error) => {
        console.log('Error in ChapterItem/resetProgress/learned PUT request:', error);
        alert('Something went wrong!');
    });

    // This resets repetition
    axios.put(`/items/reset/repetition`, request)
      .then((response) => {
        props.getChapterDetails();
      })
      .catch((error) => {
        console.log('Error in ChapterItem/resetProgress/repetition PUT request:', error);
        alert('Something went wrong!');
  });
  }

  // This sets new item to add
  const handleChange = (key) => (event) => {
    event.preventDefault();
    setItem({...newItem, 
     [key]: event.target.value,
    })
  }

  // This adds new item to chapter
  const addItem = () => {
    dispatch({ type: 'ADD_ITEM', payload: newItem });
    setItem({ 
      chapter_id: props.chapter.id,
      deck_id: props.deckId,
      user_id: user.id,
      item: '',
      description: '',
      hints: '',
      custom: '',
    })
  }

  // This deletes the selected chapter from its deck
  const deleteChapter = (chapterAndDeck) => {
    dispatch({ type: 'DELETE_CHAPTER', payload: chapterAndDeck });
    // make sure to alert the user and require confirmation before deleting!
  }

  // This updates all items in chapter when saved
  const saveChanges = (chapterId) => {
    // This removes all but the most recent edit from updateList
    if (updateList.length > 0) {
      let removeIndexList = [0];
      for (let index = updateList.length-1; index > -1; index--) {
        for (let removeIndex of removeIndexList) {
          if (updateList[index].i_id === removeIndex) {
            updateList.splice(index, 1);
            break;
          }
        }
        removeIndexList.push(updateList[index].i_id);
      }
      for (let index of updateList) {
        index.chapter_id = chapterId;
      }
      // This creates a PUT request for every row in updateList
      for (let update of updateList) {
        axios.put('/items/update', update)
          .then((response) => {
            dispatch({ type: 'FETCH_CHAPTERS', payload: props.deckId })
            props.getChapterDetails();
          })
          .catch((error) => {
            console.log('Error in ChapterItem/saveChanges PUT request:', error);
            alert('Something went wrong!');
        });
      }
    }
    // This updates the chapter title
    console.log('chapterId:', props.chapter.id);
    if (newTitle !== props.chapter.title) {
      axios.put('/chapters/update', {title: newTitle, chapterId: props.chapter.id})
        .then((response) => {
          dispatch({ type: 'FETCH_CHAPTERS', payload: props.deckId })
          props.getChapterDetails();
        })
        .catch((error) => {
          console.log('Error in ChapterItem/saveChanges/title PUT request:', error);
          alert('Something went wrong!');
      });
    }
    setUpdateList([]);
  }

  return (
    <Grid item xs={12}>
      {edit ?
        // Displays chapter in edit mode
        <Card sx={[ 
          {width: '90%'},
          {margin: 'auto'},
          {padding: '0px 20px'},
          {display: 'flex'}, 
          {flexDirection: 'row'},
          {justifyContent: 'space-between'},
          {borderRadius: '0px'}, 
          {backgroundImage: `white`},
          {alignItems: 'center'}
        ]}>
          <CardContent sx={{ width: '100%' }}>
              <Stack direction='row' justifyContent='space-between'>
                <TextField label="Title" variant="outlined"
                    type="text" 
                    value={newTitle} 
                    onChange={e => setTitle(e.target.value)} />
                  {/* Button to turn edit mode off */}
                  <IconButton onClick={() => editChapter(props.chapter.id)}
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
                        <CloseFullscreenIcon sx={{fontSize: '40px'}} />   
                    </Tooltip>
                  </IconButton>
              </Stack>

              <ItemGrid chapterId={props.chapter.id} updateList={updateList} setUpdateList={setUpdateList}/>
              <br />
              <form>
                  <TextField label="Word" variant="outlined" sx={{}}
                      required 
                      type="text" 
                      value={newItem.item} 
                      onChange={handleChange('item')} />
                  <TextField label="Definition/Translation" variant="outlined" sx={{}}
                      required 
                      type="text" 
                      value={newItem.description} 
                      onChange={handleChange('description')}/>
                  {/* Audio upload goes here */}
                  <TextField label="Custom" variant="outlined" sx={{}}
                      type="text" 
                      value={newItem.custom} 
                      onChange={handleChange('custom')} />
                  <TextField label="Hint" variant="outlined" sx={{}}
                      type="text" 
                      value={newItem.hints} 
                      onChange={handleChange('hints')} />
                  {/* Image upload goes here */}

                  <IconButton onClick={() => addItem()}
                    disableElevation
                    disableRipple
                    size="large"
                    sx={{
                      ml: 1,
                      "&.MuiButtonBase-root:hover": {
                        bgcolor: "transparent"
                      }
                    }} >
                    <Tooltip title="Add New Item">
                        <AddIcon sx={{fontSize: '40px'}} />   
                    </Tooltip>
                  </IconButton>
              </form>
              <br /><br />
              <Stack direction='row' justifyContent='space-between'>
                  <Button type='button' variant= 'contained' onClick={() => deleteChapter([props.chapter.id, props.chapter.deck_id])}>Delete Chapter</Button>
                  <Button type='button' variant= 'contained' onClick={() => resetProgress(props.chapter.id)}>Reset Progress</Button>
                  <Button type='button' variant= 'contained' onClick={() => saveChanges(props.chapter.id)}>Save Changes</Button>
                  
              </Stack>
          </CardContent>
        </Card>
      :
        // Displays chapter in minimized view mode
        <Card sx={[ 
            {width: '90%'},
            {height: '80px'},
            {margin: 'auto'},
            {padding: '0px 20px'},
            {display: 'flex'}, 
            {flexDirection: 'row'},
            {justifyContent: 'space-between'},
            {borderRadius: '0px'}, 
            {backgroundImage: `white`},
            {alignItems: 'center'}
        ]}>
          <CardContent sx={{ padding: '0px' }}>
              <h2>{props.chapter.title}</h2>
          </CardContent>
          <Stack direction='row' spacing={20} width='70%' justifyContent='end'>
            <CardContent sx={{ padding: '0px', width: '100%' }}>
              <ProgressBar fillColor="gold" progress={`${(props.chapter.learned/props.chapter.total)*100}%`} height={30} />
            </CardContent> 
            <CardActions>
              {props.chapter.learned < props.chapter.total ?
                  // Clickable if there are unlearned words remaining
                  <Button variant='contained' onClick={() => toLesson('learn', props.chapter.id)}>
                      Learn
                  </Button>
                  :
                  // Greyed out and unclickable
                  <Button variant='contained' sx={{ backgroundColor: 'lightgrey', color: 'grey' }}>
                      Learn
                  </Button>
              }
              {props.chapter.learned > 0 ?
                  // Clickable if learned words > 0
                  <Button variant='contained' onClick={() => toLesson('review', props.chapter.id)}>
                      Review
                  </Button>
                  :
                  // Greyed out and unclickable
                  <Button variant='contained' sx={{ backgroundColor: 'lightgrey', color: 'grey' }}>
                      Review
                  </Button>
              }
              {/* Button to turn edit mode on */}
              { user.id === props.creatorId ?
                <IconButton onClick={() => editChapter(props.chapter.id)}
                  disableElevation
                  disableRipple
                  size="large"
                  sx={{
                    ml: 1,
                    "&.MuiButtonBase-root:hover": {
                      bgcolor: "transparent"
                    }
                }}>
                  <Tooltip title="Open Editor">
                    <EditIcon sx={{fontSize: '40px'}} />   
                  </Tooltip>
                </IconButton>
              :
                <IconButton
                  disableElevation
                  disableRipple
                  size="large"
                  sx={{
                    ml: 1,
                    "&.MuiButtonBase-root:hover": {
                      bgcolor: "transparent"
                    }
                }}>
                  <Tooltip title="You must be a creator or contributor to edit this deck">
                    <EditIcon sx={{fontSize: '40px'}} />   
                  </Tooltip>
                </IconButton>
              } 
            </CardActions>
          </Stack>
        </Card>
      }
    </Grid>
  )
}

export default ChapterItem;