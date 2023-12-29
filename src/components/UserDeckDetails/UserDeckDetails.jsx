import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Stack, Box, Grid } from '@mui/material';
import ChapterItm from '../ChapterItem/ChapterItem';

// Displays the details for the selected movie
function DeckDetails({id}) {
  const deck = useSelector(store => store.deckDetails);
  console.log('deck details:', deck);

  const history = useHistory();

  // Sends user back to UserDeckList page
  const toUserDeckList = () => {
    history.push('/decks');
  }

  const addChapter = () => {

  }

  const boxStyle = {
    color: 'lavender',
    padding: '20px',
    backgroundImage: `url('${deck[0].image_url}')`
  }

  const btnStyle = {
    color: 'white',
    margin: '5px 0px'
  }


  // Displays the information for the selected Deck
  return (
    <div data-testid="deckDetails">
        {/* Top subheader */}
        <Stack direction='row' justifyContent='space-between' >

            {/* Left subheader items */}
            <Stack direction='row' alignItems='center'>
                <img src='https://static.tumblr.com/d7d601c9f738a1e6098326472def2cac/zd84lno/qI6p0mf8w/tumblr_static_9tutvrt14iskcs04w448040wo.png' 
                    style={{borderRadius: '200px'}} 
                    width='80px' height='80px' />
                <Stack direction='column'>
                    {deck[0].title}<br />
                    Creator: {deck[0].creator_id}
                </Stack>
            </Stack>

            {/* Right subheader items */}
            <Stack alignItems='center'>
                Language: {deck[0].language_id}<br />
                <Button onClick={toUserDeckList} 
                    disableRipple
                    variant='contained'>
                        Return to decks
                </Button>
            </Stack>
        </Stack>

        {/* Stats and deck options */}
        <Box style={boxStyle}>
            <Stack direction='row' justifyContent='space-between'>
                <Stack direction='column'>
                    <Button variant='contained' style={btnStyle}>Learn</Button>
                    <Button variant='contained' style={btnStyle}>Review</Button>
                </Stack>
                <Stack direction='column'>
                    <Button variant='contained' style={btnStyle}>Edit Deck</Button>
                    <Button variant='contained' style={btnStyle}>Reset Progress</Button>
                </Stack>
            </Stack>
        </Box>
        <Stack direction='row' justifyContent='space-between' sx={{ margin: '0px 20px'}}>
            <h2>Chapters</h2>
            <Button onClick={addChapter}>+ New Chapter</Button>
        </Stack>
        {/* 
        <Grid container spacing={1}>
            {deck.map((chapter) => {
                return <ChapterItem key={chapter.id} chapter={chapter} />
            })} 
        </Grid>
        */}
    </div>
  );
}

export default DeckDetails;





