import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Stack, Box, TextField, Select, MenuItem, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';

function EditDeck() {
    const history = useHistory();
    const dispatch = useDispatch();
    const deck = useSelector(store => store.deckDetails[0]);
    const user = useSelector(store => store.user);
    const languageList = useSelector(store => store.languages);
    const [newInfo, setInfo] = useState({});
    const [details, setDetails] = useState(deck.details);
    const [title, setTitle] = useState(deck.title);
    const [chosenLanguage, setLanguage] = useState(deck.language_id);
    const [contributors, setContributors] = useState(deck.contributor_id);
    const [status, setStatus] = useState(deck.public_status);

    // This will delete the delected deck and send the user to the UserDeckList page
    const deleteDeck = () => {
        dispatch({ type: 'DELETE_DECK', payload: [deck.id, user.id] });
        // make sure to alert user for confirmation before deleting!
        history.push('/decks')
    }

    // Adds new deck details to object
    const handleChange = (key) => (event) => {
        event.preventDefault();
        setInfo({...newInfo, 
            [key]: event.target.value, 
        })
    }

    // NEED TO SET UP ROUTER ROUTE FOR PUT REQUEST!!!!!!!

    // Saves details returns user to the UserDeckDetails page
    // should return to the deck page itself after setup
    const saveDetails = (event) => {
        dispatch({ type: 'UPDATE_DECK', payload: newInfo });
        console.log('newDetails:', newInfo);
        // add return here
        history.push('/decks')
    }

    const stackStyle = {
        margin: '20px'
    }

    // Toggle swtich styling, probably placeholder
    const ToggleSwitch = styled(Switch)(({ theme }) => ({
        width: 200,
        height: 25,
        padding: 0,
        display: 'flex',
        '&:active': {
        '& .MuiSwitch-thumb': {
            width: 50,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(144px)',
        },
        },
        '& .MuiSwitch-switchBase': {
        padding: 3,
        '&.Mui-checked': {
            transform: 'translateX(144px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
        },
        '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 50,
        height: 19,
        borderRadius: 10,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
        },
        '& .MuiSwitch-track': {
        borderRadius: 24 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
        },
    }));

    useEffect(() => {
        dispatch({ type: 'FETCH_LANGUAGES' });
    }, []);

    return (
        <Box sx={{ margin: '50px', height: '550px', backgroundColor: 'white', borderRadius: '20px' }}>
            <Stack style={stackStyle} direction='row' height='100%' justifyContent='space-between'>

                {/* Left stack */}
                <Stack style={stackStyle} direction='column' justifyContent='space-between' >
                    <Stack direction='column'>
                        <img src={deck.image_url} width='300px'/>
                        <br /><br />
                        <Button type='button' variant='contained'> Upload </Button>
                    </Stack>
                    <Button type='button' variant='contained' onClick={() => deleteDeck(deck.id)}> Delete Deck </Button>
                </Stack>

                {/* Right stack */}
                <Stack style={stackStyle} direction='column' justifyContent='space-between' width='380px'>
                    <Stack style={stackStyle} direction='row' alignItems='center' justifyContent='space-between'>
                        Title 
                        <TextField variant='outlined'
                            value={title}
                            onChange={(e) => { setTitle(e.target.value); handleChange('title') }}

                        />
                    </Stack>

                    <Stack style={stackStyle} direction='row' alignItems='center' justifyContent='space-between'>
                        Language
                        <Select sx={{ 
                            backgroundColor: 'lavender', 
                            borderRadius: '20px', 
                            margin: '0px 3px', 
                            width: '200px'  }}
                            value={chosenLanguage}
                            label='Language'
                            onChange={(e) => { setLanguage(e.target.value); handleChange('language_id') }}
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
                    </Stack>

                    <Stack style={stackStyle} direction='row' alignItems='center' justifyContent='space-between'>
                        Details
                        <TextField 
                            multiline
                            value={details}
                            onChange={(e) => { setDetails(e.target.value); handleChange('details') }}
                            sx={{ width: '400px' }}
                            inputProps={{ style: {fontWeight: '300', color: 'rgb(72, 72, 72)'} }} 
                        />
                    </Stack>

                    <Stack style={stackStyle} direction='row' alignItems='center' justifyContent='space-between'>
                        Contributors
                        <TextField variant='outlined'
                            value={contributors} 
                            onChange={(e) => { setContributors(e.target.value); handleChange('contributor_id') }}
                        />
                    </Stack>

                    {/* might make this a toggle instead */}
                    <Stack style={stackStyle} direction='row' alignItems='center' justifyContent='space-between'>
                        Make public?
                        <ToggleSwitch inputProps={{ 'aria-label': 'ant design' }} 
                            value={status} onChange={(e) => { setStatus(!deck.status); handleChange('public_status') }} />
                    </Stack>

                </Stack>
                <Stack style={stackStyle} justifyContent='end'>
                    <Button type='submit' variant='contained' onClick={() => saveDetails()}>Save</Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default EditDeck;