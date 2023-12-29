import React from 'react';
import { Card, CardMedia, CardContent, CardActions,
  Grid, Button } from '@mui/material';

// This displays each chapter on the UserDeckDetails page
function ChapterItem(props) {

  const toLesson = (items) => {
    // This will link to Learning/Review page and load deck for studying
  }

  const editChapter = (chapterId) => {
    // This will expand the selected chapter for editing
  }

  return (
    <Grid item m={3}>
      <Card sx={[ 
        {width: '80%'},
        {marginTop: '10px'},
        {display: 'flex'}, 
        {justifyContent: 'space-between'},
        {flexDirection: 'row'},
        {borderRadius: '10px'}, 
        {backgroundImage: `white`},
        {boxShadow: '-2px 2px 10px 5px teal'},
        {'&:hover': {
            opacity: .5
        }}
      ]}>
        <CardContent sx={{ padding: '0px' }}>
          <h3>{props.chapter.title}</h3>
          Progress bar will go here - stretch goal
        </CardContent>
        <CardActions>
            {props.chapter.learned < props.chapter.items.length ?
                // Clickable if there are unlearned words remaining
                <Button variant='contained' onClick={toLesson('learn')}>
                    Learn
                </Button>
                :
                // Greyed out and unclickable
                <Button variant='contained' >
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
                <Button variant='contained' >
                    Review
                </Button>
            }
            <Button variant='contained' onClick={editChapter(props.chapter.id)}>
                Edit
            </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ChapterItem;