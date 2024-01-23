import React from 'react';
import { Box } from '@mui/material';

function AboutPage() {
  return (
    <Box sx={{ backgroundColor: 'aliceblue', width: '40%', margin: 'auto', padding: '20px', opacity: .8 }}>
      <h3 style={{ textAlign: 'center' }}>Technologies used:</h3>
        <ul style={{ textAlign: 'center', padding: '0px' }}>
          <p>HTML/CSS<br />
          JavaScript<br />
          Node.js<br />
          Express<br />
          React<br />
          Redux<br />
          Redux-Sagas<br />
          Material UI<br />
          PostgreSQL<br />
          Chart.js</p>
        </ul>
        <h3 style={{ textAlign: 'center' }}>Challenges</h3>
          <p style={{ width: '80%', margin: 'auto' }}>The most challenging part of this project was organizing 
            all of the data while keeping track of all of the SQL queries and routes. </p>
        <h3 style={{ textAlign: 'center' }}>Next Steps</h3>
          <p style={{ width: '80%', margin: 'auto' }}>Next I hope to add image uploading, audio recording and playback, and links to share decks with friends.</p>
      <h3 style={{ textAlign: 'center' }}>Thanks</h3>
        <ul style={{ textAlign: 'center', padding: '0px' }}>
          <p>Chris Black<br />
          Prime Academy<br />
          Taaffeite Cohort</p>
        </ul>
    </Box>
  );
}

export default AboutPage;
