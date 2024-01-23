import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box } from '@mui/material';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Box sx={{ backgroundColor: 'aliceblue', color: 'black', borderRadius: '0px', width: '300px', margin: 'auto' }}>
      <form className="formPanel" onSubmit={registerUser}>
        <h2>Register New User</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <Button className="btn" type="submit" name="submit" value="Register" disableRipple 
            sx={[ {backgroundColor: '#42d3ff'}, {borderRadius: '0px'}, {color: 'black'}, {fontWeight: 800}, {'&:hover': {backgroundColor: '#3777de' }} ]}>Register
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default RegisterForm;
