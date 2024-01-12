import React from 'react';
import { Card, Grid, CardContent } from '@mui/material';


function StudyItem(props) {


  return (
    <Grid item xs={4}>
      <Card onClick={() => props.checkAnswer(props.item.i_id)} 
        sx={[ 
          {maxWidth: '200px'},
          {marginTop: '10px'},
          {display: 'flex'}, 
          {flexDirection: 'column'},
          {borderRadius: '10px'}, 
          {backgroundColor: 'white'} 
        ]}>
          <CardContent sx={{ padding: '20px' }}>
            {/* replace .description with user.type after testing */}
            <h4>{props.item.description}</h4>
          </CardContent>
      </Card>
    </Grid>
  )    
}

export default StudyItem;