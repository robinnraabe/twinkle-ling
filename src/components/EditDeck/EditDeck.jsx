import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Stack, Box, TextField, Select, MenuItem } from '@mui/material';

function EditDeck() {
    const deck = useSelector(store => store.deckDetails);
    const languageList = useSelector(store => store.languages);
    const [chosenLanguage, setLanguage] = useState({});

    const history = useHistory();
  
    // Sets language for deck
    const handleLanguageChange = (key) => (event) => {
      setLanguage({[key]: event.target.value}); 
      console.log(chosenLanguage);
    }

    // This will delete the delected deck and send the user to the UserDeckList page
    const deleteDeck = (key) => (event) => {
        // make sure to alert user for confirmation before deleting!

        history.push('/decks')
    }

    // Sends the user back to the UserDeckDetails page
    const toDeck = () => {
        history.push('/..');
      }

    return (
        <Box onClick={submit}>
            <Stack direction='column' justifyContent='space-between'>
                <Stack direction='column'>
                    <img src={deck.image_url} />
                    <Button variant='contained'> Upload </Button>
                </Stack>
                <Button variant='contained' onClick={deleteDeck(deck.id)}> Delete Deck </Button>
            </Stack>
            <Stack direction='column'>
                Title 
                <TextField variant='outlined'
                    value={deck.title}>

                </TextField>

                Language
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

                Details
                <TextField variant='outlined'
                    value={deck.details}>

                </TextField>

                Contributors
                <TextField variant='outlined'
                    value={deck.contributor_id}>

                </TextField>

                {/* might make this a toggle instead */}
                Status
                <Select sx={{ 
                    backgroundColor: 'lavender', 
                    borderRadius: '20px', 
                    margin: '0px 3px', 
                    width: '200px'  }}
                    value={chosenStatus.id}
                    label='Status'
                    onChange={handleStatusChange('id')}
                >
                    {statusList.map(status => {
                        return (
                            <MenuItem 
                                key={status.id} 
                                value={status.id}>
                                    {status.status}
                            </MenuItem>
                        );
                    })}
                </Select>
            </Stack>
            <Button variant='contained' onClick={toDeck()}>Save</Button>
        </Box>
    )
}

export default EditDeck;