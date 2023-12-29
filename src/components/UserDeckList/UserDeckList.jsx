import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Grid, Switch, Stack, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DeckItem from '../DeckItem/DeckItem';
import { styled } from '@mui/material/styles';

function UserPage() {
  const dispatch = useDispatch();
  const [userDeckList, setUserDeckList] = useState([]);
  const languageList = useSelector(store => store.languages);
  const [chosenLanguage, setLanguage] = useState({});

  // Sets language ID for GET route
  const handleLanguageChange = (key) => (event) => {
    setLanguage({[key]: event.target.value}); 
    console.log(chosenLanguage);
  }

  // Sends user to the page for the selected deck
  const toDeck = () => {
    history.push('/deck/view');
  }

  // Sets toggle value to ALL or USER CREATED decks
  const changeDecks = (event) => {

  }

  const getUserDeckList = () => {
    // need to pass user ID?, toggle and language filters
    axios.get('/decks/user/all').then((response) => {
        const action = { type: 'SET_USER_DECK_LIST', payload: response.data };
        dispatch(action);
        setUserDeckList(response.data);
    }).catch((error) => {
        console.log('GET /user/all error', error);
        alert("Something went wrong fetching user's decks");
    })
    console.log('chosenLanguage:', chosenLanguage);
  }

  // Toggle swtich styling, probably placeholder
  const ToggleSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));
  
  useEffect(() => {
    getUserDeckList();
    dispatch({ type: 'FETCH_LANGUAGES' });
  }, [])

  return (
    <div>
      {/* Subheader filters */}
      <Stack direction='row' alignItems='center' justifyContent='space-between'>

        {/* Toggle switch filter */}
        <Stack direction='row' spacing={1} alignItems="center">
            <h3>All</h3>
            <ToggleSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} 
              onChange={changeDecks}/>
            <h3>User Created</h3>
        </Stack>

        {/* Language select filter - still need to make this select an option */}
        <FormControl>
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
        </FormControl>
      </Stack>

      <h2>Deck List</h2>
      <Grid container spacing={1}>
        {userDeckList.map((deck) => {
            return <DeckItem key={deck.id} deck={deck} />
        })} 
      </Grid>
    </div>
  );
}

export default UserPage;
