import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, Stack, CardContent, CardActions,
  Grid, Button, TextField, IconButton, Tooltip } from '@mui/material';
import ItemGrid from '../ItemGrid/ItemGrid';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

// This displays each chapter on the UserDeckDetails page
function ChapterItem(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newItem, setItem] = useState('');
  let edit = props.chapter.edit;

  const toLesson = (type) => {
    // This will link to Learning/Review page and load deck for studying
    history.push('/session');
  }

  const editChapter = (chapterId) => {
    axios.put(`/chapters/${chapterId}`)
      .then((response) => {
          props.getChapterDetails();
      })
      .catch((error) => {
          console.log('Error in editChapter PUT request:', error);
          alert('Something went wrong!');
    });
  }

  const resetProgress = (chapterId) => {
    // This will reset the progress for the selected chapter to 0
    axios.put(`/items/${chapterId}`)
    .then((response) => {
        props.getChapterDetails();
    })
    .catch((error) => {
        console.log('Error in resetProgress PUT request:', error);
        alert('Something went wrong!');
    });
  }

  // This sets new item to add
  const handleChange = (key) => (event) => {
    event.preventDefault();
    setItem({...newItem, 
     [key]: event.target.value,
     chapter_id: props.chapter.id
    })
  }

  // This adds new item to chapter
  const addItem = () => {
    dispatch({ type: 'ADD_ITEM', payload: newItem });
    console.log('newItem:', newItem);
    newItem.item = '';
    newItem.description = '';
    newItem.hints = '';
    newItem.tags = '';
  }

  // This deletes the selected chapter from its deck
  const deleteChapter = (chapterAndDeck) => {
    dispatch({ type: 'DELETE_CHAPTER', payload: chapterAndDeck });
    // make sure to alert the user and require confirmation before deleting!
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
          {borderRadius: '10px'}, 
          {backgroundImage: `white`},
          {boxShadow: '-2px 2px 10px 5px teal'}
        ]}>
          <CardContent sx={{ width: '100%' }}>
              <Stack direction='row' justifyContent='space-between'>
                  <h1>{props.chapter.title} </h1> 
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

              <ItemGrid chapterId={props.chapter.id} />
              <br />
              <form>
                  <TextField label="Word" variant="outlined" sx={{}}
                      required 
                      type="text" 
                      value={newItem.item} 
                      onChange={handleChange('item')} 
                      placeholder="word"/>
                  <TextField label="Definition/Translation" variant="outlined" sx={{}}
                      required 
                      type="text" 
                      value={newItem.description} 
                      onChange={handleChange('description')} 
                      placeholder="definition/translation"/>
                  {/* Audio upload goes here */}
                  <TextField label="Tags" variant="outlined" sx={{}}
                      type="text" 
                      value={newItem.tags} 
                      onChange={handleChange('tags')} 
                      placeholder="tags"/>
                  <TextField label="Hint" variant="outlined" sx={{}}
                      type="text" 
                      value={newItem.hints} 
                      onChange={handleChange('hints')} 
                      placeholder="hints"/>
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
            {margin: 'auto'},
            {padding: '0px 20px'},
            {display: 'flex'}, 
            {flexDirection: 'row'},
            {justifyContent: 'space-between'},
            {borderRadius: '10px'}, 
            {backgroundImage: `white`},
            {boxShadow: '-2px 2px 10px 5px teal'}
        ]}>
          <CardContent sx={{ padding: '0px' }}>
              <h1>{props.chapter.title}</h1>
          </CardContent>
          <CardContent sx={{ padding: '0px' }}>
              Progress bar will go here - stretch goal
          </CardContent>
          <CardActions>
            {props.chapter.learned < props.chapter.total ?
                // Clickable if there are unlearned words remaining
                <Button variant='contained' onClick={() => toLesson('learn')}>
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
                <Button variant='contained' onClick={() => toLesson('review')}>
                    Review
                </Button>
                :
                // Greyed out and unclickable
                <Button variant='contained' sx={{ backgroundColor: 'lightgrey', color: 'grey' }}>
                    Review
                </Button>
            }
            {/* Button to turn edit mode on */}
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
          </CardActions>
        </Card>
      }
    </Grid>
  )
}

export default ChapterItem;