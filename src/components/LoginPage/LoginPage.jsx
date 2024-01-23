import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import '../RegisterPage/RegisterPage.css';


function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />
      <center>
        <Button sx={[ {backgroundColor: '#42d3ff'}, {borderRadius: '0px'}, {color: 'black'}, 
          {fontWeight: 800}, {'&:hover': {backgroundColor: '#3777de', color: 'black' }} ]}
          disableRipple
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
      <div class='night'>
        <div className='star'></div>
        <div className='star'></div>
        <div className='star'></div>
        <div className='star'></div>
        <div className='star'></div>
      </div>
    </div>
  );
}

export default LoginPage;
