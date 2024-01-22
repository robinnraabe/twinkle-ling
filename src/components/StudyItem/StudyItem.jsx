import React from 'react';
import { Card, Grid, CardContent } from '@mui/material';


function StudyItem(props) {
  let fontSize = '24px';
  let prompt = `${props.item[props.user.answer]}`;

  if (props.user.answer === 'item') {
    fontSize = '30px';
  }
  else if (props.user.answer === 'description') {
    fontSize = '20px';
  }
  else if (props.user.answer === 'image_url') {
    prompt = props.item.image;
  }
  if (props.item[props.user.answer] === null && props.user.prompt === 'description') {
    prompt = props.item.item
  }
  else if (props.item[props.user.answer] === null) {
    prompt = props.item.description
  }

  return (
    <Grid item xs={4}>
      <Card onClick={() => props.checkAnswer(props.item.i_id)} 
        sx={[ 
          {maxWidth: '200px'},
          {height: '100px'},
          {fontSize: `${fontSize}`},
          {margin: '10px 0px 0px 0px'},
          {display: 'flex'}, 
          {flexDirection: 'column'},
          {borderRadius: '0px'}, 
          {backgroundColor: 'white'},
          {padding: '0px 0px'},
          {alignItems: 'center'}
        ]}>
        { props.user.answer === 'image_url' ?
          <CardContent>
            <img src={`${prompt}`} width='80px' />
          </CardContent>
        :
          <CardContent>
            <h4 style={{ fontWeight: 'normal', fontSize: '16px', userSelect: 'none' }}>{prompt}</h4>
          </CardContent>
        }
      </Card>
    </Grid>
  )    
}

export default StudyItem;