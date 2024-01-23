import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Button } from '@mui/material';
import './RegisterPage.css';

function RegisterPage() {
  const history = useHistory();

  return (
    <div className='result-app'>
      <RegisterForm />

      <center>
      <Button sx={[ {backgroundColor: '#42d3ff'}, {borderRadius: '0px'}, {color: 'black'}, 
          {fontWeight: 800}, {'&:hover': {backgroundColor: '#3777de', color: 'black' }} ]}
          disableRipple
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </center>
      <div className='night'>
        <div className='star' style={{ color: 'white'}}></div>
        <div className='star' style={{ color: 'white'}}></div>
        <div className='star' style={{ color: 'white'}}></div>
        <div className='star' style={{ color: 'white'}}></div>
        <div className='star' style={{ color: 'white'}}></div>
      </div>
    </div>
  );
}

export default RegisterPage;
