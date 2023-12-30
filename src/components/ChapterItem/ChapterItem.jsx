import React from 'react';
import { Card, Stack, CardContent, CardActions,
  Grid, Button } from '@mui/material';

// This displays each chapter on the UserDeckDetails page
function ChapterItem(props) {

  const toLesson = (type) => {
    // This will link to Learning/Review page and load deck for studying
  }

  const editChapter = (chapterId) => {
    // This will expand the selected chapter for editing
  }

  const resetProgress = () => {
    // This will reset the progress for the selecter chapter to 0
  }

  const deleteChapter = () => {
    // This will delete the selected chapter
    // make sure to alert the user and require confirmation before deleting!
  }

  return (
    <Grid item xs={12}>
        {props.chapter.edit ?
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
                <CardContent sx={{ padding: '0px' }}>
                    <Stack direction='row' justifyContent='space-between'>
                        <h3>{props.chapter.title}</h3>
                        <h3> --- </h3>
                    </Stack>
                    
                    <Stack direction='row' justifyContent='space-between'>
                        <Button type='button' onClick={() => resetProgress()}>Reset Progress</Button>
                        <Button type='button' onClick={() => deleteChapter()}>Delete Chapter</Button>
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
                    <h3>{props.chapter.title}</h3>
                </CardContent>
                <CardContent sx={{ padding: '0px' }}>
                    Progress bar will go here - stretch goal
                </CardContent>
                <CardActions>
        
                    {props.chapter.learned < props.chapter.total ?
                        // Clickable if there are unlearned words remaining
                        <Button variant='contained' onClick={toLesson('learn')}>
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
                        <Button variant='contained' onClick={toLesson('review')}>
                            Review
                        </Button>
                        :
                        // Greyed out and unclickable
                        <Button variant='contained' sx={{ backgroundColor: 'lightgrey', color: 'grey' }}>
                            Review
                        </Button>
                    }
        
                    <Button variant='contained' onClick={editChapter(props.chapter.id)}>
                        Edit
                    </Button>
                </CardActions>
            </Card>
        }
    </Grid>
  )
}

export default ChapterItem;