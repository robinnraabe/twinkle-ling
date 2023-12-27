import React from 'react';
import axios from 'axios';
import LogOutButton from '../LogOutButton/LogOutButton'; // this will probably get moved to the header
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Grid } from '@mui/material';
import DeckItem from '../DeckItem/DeckItem';

function UserPage() {
  const user = useSelector((store) => store.user);
  const [userDeckList, setUserDeckList] = useState([]);
  const [publicDeckList, setPublicDeckList] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const toUserDeckList = () => {
    history.push('/decks')
  }

  const toTrendingDeckList = () => {
    // route doesn't exist yet
    history.push('/trending')
  }

  const getUserDeckList = () => {
      axios.get('/decks/user').then((response) => {
          const action = { type: 'SET_USER_DECK_LIST', payload: response.data };
          dispatch(action);
          setUserDeckList(response.data);
          console.log(response.data);
      }).catch((error) => {
          console.log('GET /user/decks error', error);
          alert("Something went wrong fetching user's decks");
      })
  }

  const getPublicDeckList = () => {
    axios.get('/decks/public').then((response) => {
        const action = { type: 'SET_PUBLIC_DECK_LIST', payload: response.data };
        dispatch(action);
        setPublicDeckList(response.data);
    }).catch((error) => {
        console.log('GET /public/decks error', error);
        alert('Something went wrong fetching public decks');
    })
}

  useEffect(() => {
      getUserDeckList();
      getPublicDeckList();
  }, [])

  return (
    <div className="container">
      {/* <LogOutButton className="btn" /> */}

      <h2>Welcome, {user.username}!</h2>

      {/* placeholder image for stats */}
      <img src='https://www.statology.org/wp-content/uploads/2021/10/combo6.png' width='500px' alt='stats example' />

      <h3 onClick={toUserDeckList}>Recent Decks</h3>
      {/* make sure to sort by most recently used decks */}
      <Grid container spacing={1}>
        {userDeckList.map((deck) => {
            return <DeckItem key={deck.id} deck={deck} />
        })} 
        {/* last card should be a link to deck list*/}
      </Grid>
      
      <h3 onClick={toTrendingDeckList}> Trending Decks</h3>
      {/* make sure to sort by most used! still gotta figure out how that's calculated */}
      <Grid container spacing={1}>
        {publicDeckList.map((deck) => {
            return <DeckItem key={deck.id} deck={deck} />
        })} 
        {/* last card should be a link to trending list - stretch goal */}
      </Grid>
    </div>
  )
}
     
export default UserPage;
