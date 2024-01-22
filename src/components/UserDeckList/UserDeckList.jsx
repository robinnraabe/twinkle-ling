import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Stack, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import DeckItem from '../DeckItem/DeckItem';

function UserPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userDeckList, setUserDeckList] = useState([]);
  const languageList = useSelector(store => store.languages);
  const [chosenLanguage, setLanguage] = useState({});
  const user = useSelector(store => store.user);

  // This sets the language ID to GET decks
  const handleLanguageChange = (key) => (event) => {
    setLanguage({[key]: event.target.value}); 
  }

  // Sends user to the page for the selected deck
  const toDeck = (deckId) => {

    // This gets details for the selected deck
    axios.get(`/deck/${deckId}`)
      .then(response => {
        dispatch({ type: 'SET_DECK_DETAILS', payload: response.data[0] });

        // This gets details for all chapters in selected deck
        axios.get(`/chapters/${deckId}`)
          .then(response => {
            dispatch({ type: 'SET_CHAPTER_DETAILS', payload: response.data });
          })
          .catch(error => {
            console.log('Error getting chapter details:', error);
            alert('Something went wrong!');
        })
      })
      .catch(error => {
        console.log('Error getting deck details:', error);
        alert('Something went wrong!');
    })
    setTimeout(() => {
      history.push('/deck/details');
    }, 500);
  }

  // Creates a new (empty) deck and sends the user to the EditDeck page
  const addDeck = () => {
    const newDeck = {
      title: 'New Deck', 
      details: 'New Deck', 
      language_id: 3, 
      creator_id: user.id, 
      contributor_id: user.id,
      image_url: 'https://images.unsplash.com/photo-1483354483454-4cd359948304'
    }
    dispatch({ type: 'ADD_DECK', payload: newDeck });
    getUserDeckList();
    // history.push('/deck/edit');
  }

  const getUserDeckList = () => {
    // need to pass user ID?, toggle and language filters
    axios.get(`/decks/user/all/${user.id}`)
      .then((response) => {
        const action = { type: 'SET_USER_DECK_LIST', payload: response.data };
        dispatch(action);
        setUserDeckList(response.data);
      })
      .catch((error) => {
        console.log('GET /user/all error', error);
        alert("Something went wrong fetching user's decks");
    })
  }
  
  useEffect(() => {
    getUserDeckList();
    // dispatch({ type: 'FETCH_LANGUAGES' });
  }, [])

  return (
    <div className='white'>
      {/* Subheader filters */}
      <Stack direction='row' alignItems='center' justifyContent='space-between' margin='20px'>
        {/* Language select filter - still need to make this select an option */}
        {/* <FormControl>
          <InputLabel>Language</InputLabel>
          <Select sx={{ 
            backgroundColor: 'lavender', 
            borderRadius: '20px', 
            margin: '0px 3px', 
            width: '200px'  }}
            value={chosenLanguage.id}
            label='Language'
            onChange={handleLanguageChange('id')}
          >
            {languageList.map(language => {
                return (
                    <MenuItem 
                        key={language.id} 
                        value={language.id}>
                            {language.language}
                    </MenuItem>
                );
            })}
          </Select>
          </FormControl> */}
      </Stack>

      <Stack direction='row' justifyContent='space-between' sx={{ margin: '0px 20px'}}>
            <h2 className='white' style={{ marginLeft: '2%' }}>{user.username}'s Decks</h2>
            <Button sx={{ fontSize: '24px', marginRight: '2%', color: '#42d3ff', fontWeight: '600' }} onClick={addDeck}>+ New Deck</Button>
      </Stack>
      <Grid container spacing={1} sx={{ marginLeft: '1%' }}>
        {userDeckList.map((deck) => {
            return <DeckItem key={deck.id} deck={deck} toDeck={() => toDeck(deck.id)} />
        })} 
      </Grid>
    </div>
  );
}

export default UserPage;

