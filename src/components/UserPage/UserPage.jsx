import React from 'react';
import axios from 'axios';
import LogOutButton from '../LogOutButton/LogOutButton'; // this will probably get moved to the header
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Grid, Card, CardContent, Box } from '@mui/material';
import { format } from 'date-fns';
import DeckItem from '../DeckItem/DeckItem';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from '../LineChart/LineChart';

Chart.register(CategoryScale);

function UserPage() {
  const user = useSelector(store => store.user);
  const [userDeckList, setUserDeckList] = useState([]);
  const [publicDeckList, setPublicDeckList] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const userData =  [{date: 0, total_correct: 0}];
  const [chartData, setChartData] = useState({
    labels: userData.map((data) => data.date), 
    datasets: [
      {
        label: userData.map((data) => data.date),
        data: userData.map((data) => data.total_correct),
        backgroundColor: ["#f4a500", "42d3ff"],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  const toUserDeckList = () => {
    history.push('/decks')
  }

  // Sends user to the page for the selected deck
  const toDeck = (deckId) => {
    axios.get(`/deck/${deckId}`).then(response => {
      dispatch({ type: 'SET_DECK_DETAILS', payload: response.data[0] });
      setTimeout(() => {
        history.push('/deck/details');
      }, 500);
    })
      .catch(error => {
        console.log('Error getting deck details:', error);
        alert('Something went wrong!');
      })
  }

  const toTrendingDeckList = () => {
    // route doesn't exist yet
    history.push('/trending')
  }

  // Gets max number of total_correct from userData for styling the chart
  const getyMax = (array) => {
    let yHeight = 0;
    for (let data of array) {
      if (data.total_correct > yHeight) {
        yHeight = data.total_correct;
      }
    }
    return yHeight;
  }

  // Custom star point for chart
  const starPoint = function(context, options){
    const cvs = document.createElement('canvas'),
        ctx = cvs.getContext('2d'),
        radius = options.pointRadius || 5;
    cvs.height = 2*radius;
    cvs.width = 2*radius;
    //from https://stackoverflow.com/a/58043598/16466946
    const nSpikes = 5, x0 = cvs.width/2, y0 = cvs.height/2;
    ctx.beginPath();
    for(let i = 0; i < nSpikes*2; i++){
        const rotation = Math.PI/2,
            angle = (i/(nSpikes*2))*Math.PI*2+rotation,
            dist = radius/2*(i%2)+radius/2,
            x = x0+Math.cos(angle)*dist,
            y = y0+Math.sin(angle)*dist;
        if(i === 0) {
            ctx.moveTo(x, y);
        }
        else{
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.fillStyle = options.backgroundColor;
    ctx.strokeStyle = options.borderColor;
    ctx.fill();
    ctx.stroke();
    return cvs;
}

// Gets and sets the data to populate the chart
  const getUserData = () => {
    axios.get(`/data/user/${user.id}`)
      .then((response) => {
        let userData = response.data.reverse();
        let yMax = getyMax(userData);
        setChartData({
          yMax: yMax,
          labels: userData.map((data) => format(new Date(data.date), "MMM do")), 
          datasets: [
            {
              label: "Words reviewed",
              data: userData.map((data) => data.total_correct),
              backgroundColor: "#315bb540",
              borderWidth: 0,
              fill: true, 
              pointRadius: 10,
              rotation: [0, 30, 60, 90, 120, 150, 180],
              pointStyle: starPoint,
              pointBackgroundColor: ["#d1b536", "#42d3ff"],
              pointBorderColor: ["#d1b536", "#42d3ff"],
              borderDash: [50, 50],
              borderDashOffset: 140,
            }
          ]
        });
      })
      .catch((error) => {
        console.log('GET /data/user error', error);
        alert("Something went wrong!");
    })
  }

  //
  const getUserDeckList = () => {
    axios.get(`/decks/user/${user.id}`)
      .then((response) => {
        const action = { type: 'SET_USER_DECK_LIST', payload: response.data };
        dispatch(action);
        setUserDeckList(response.data);
      })
      .catch((error) => {
        console.log('GET /user/decks error', error);
        alert("Something went wrong!");
    })
  }

  const getPublicDeckList = () => {
    axios.get('/decks/public')
      .then((response) => {
        const action = { type: 'SET_PUBLIC_DECK_LIST', payload: response.data };
        dispatch(action);
        setPublicDeckList(response.data);
      })
      .catch((error) => {
        console.log('GET /public/decks error', error);
        alert('Something went wrong!');
    })
}

const options = {
  maintainAspectRatio: false,
  aspectRatio: 3
  }

  useEffect(() => {
    getUserDeckList();
    getPublicDeckList();
    getUserData();
  }, [])

    return (
      <div className="container">
        {/* <LogOutButton className="btn" /> */}

        <h2 className="white" style={{ marginLeft: '2%' }}>Welcome, {user.username}!</h2>
        <Box sx={{ backgroundColor: '#00000080', width: '60%', marginLeft: '10%', marginBottom: '120px', padding: '20px' }}>
          <LineChart chartData={chartData} options={options} />
        </Box>

        <h2 className="white" style={{ marginLeft: '2%' }}>Recent Decks</h2>
        {/* make sure to sort by most recently used decks */}
        <Grid container spacing={1} marginBottom='100px'>
          {userDeckList.map((deck) => {
            return <DeckItem key={deck.id} deck={deck} public={false} toDeck={() => toDeck(deck.id)} />
          })} 
          {/* last card links to the user's full list of decks*/}
          <Grid item m={3}>
          <Card onClick={toUserDeckList} sx={[
            {width: '12vw'},
            {height: '100%'},
            {marginTop: '10px'},
            {display: 'flex'}, 
            {color: '#42d3ff'},
            {justifyContent: 'center'},
            {alignItems: 'center'},
            {flexDirection: 'column'},
            {borderRadius: '0px'}, 
            {backgroundColor: '#181818'},
            {'&:hover': {
              backgroundColor: '#282828'
            }}
          ]}>
            <CardContent sx={{ textAlign: 'center' }} >
              <h1>View</h1> <h1>All</h1>
            </CardContent>
          </Card>
          </Grid>
        </Grid>
        
        <h2 className="white" style={{ marginLeft: '2%' }}> Trending Decks</h2>
        {/* make sure to sort by most used! still gotta figure out how that's calculated */}
        <div style={{ alignContent: 'center' }}>
          <Grid container spacing={1} >
            {publicDeckList.map((deck) => {
              return <DeckItem key={deck.id} public={true} deck={deck} />
            })} 
            {/* last card links to the trending list (link is not set up yet) */}
            <Grid item m={3}>
              <Card sx={[
                {width: '12vw'},
                {height: '100%'},
                {marginTop: '10px'},
                {display: 'flex'}, 
                {color: '#42d3ff'},
                {justifyContent: 'center'},
                {alignItems: 'center'},
                {flexDirection: 'column'},
                {borderRadius: '0px'}, 
                {backgroundColor: '#181818'},
                {'&:hover': {
                  backgroundColor: '#282828'
                }}
              ]}>
                <CardContent sx={{ textAlign: 'center' }} >
                  <h1>View</h1> <h1>All</h1>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    )
}
     
export default UserPage;
