import React from 'react';
import {useSelector} from 'react-redux';
import { Grid } from '@mui/material';

function UserPage() {
  const [userDeckList, setUserDeckList] = useState([]);

  const getUserDeckList = () => {
    // route doesn't exist yet
    axios.get('/user/all').then((response) => {
        const action = { type: 'SET_USER_DECK_LIST', payload: response.data };
        dispatch(action);
        setUserDeckList(response.data);
    }).catch((error) => {
        console.log('GET /user/all error', error);
        alert("Something went wrong fetching user's decks");
    })
  }

  useEffect(() => {
    getUserDeckList();
  }, [])

  return (
    <div>
        Toggle, Language filter

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
