import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Header from '../Header';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux'
import { login, setUserId } from '../../redux/UserSlice'


export default function SignUp() {
  const theme = createTheme();
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      degree: data.get('degree'),
      birthday: data.get('birthday'),
      mobileNumber: data.get('mobileNumber'),
      password: data.get('password'),
      rePassword: data.get('rePassword'),
    });

    const firstName = data.get('firstName')
    const lastName = data.get('lastName')
    const email = data.get('email')
    const degree = data.get('degree')
    const birthday = data.get('birthday')
    const mobileNumber = data.get('mobileNumber')
    const password = data.get('password')
    const rePassword = data.get('rePassword')

    if (firstName === "" || lastName === "" || email === "" || degree === "" || birthday === "" || mobileNumber === "" || password === "" || rePassword === "" || !email.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      alert("Please fill in the correct information")
      return
    }

    if (data.get('password') !== data.get('rePassword')) {
      alert("Re-enter password is different from the password!")
      return
    }

    fetch('http://localhost:8080/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "firstName": data.get('firstName'),
        "lastName": data.get('lastName'),
        "email": data.get('email'),
        "degree": data.get('degree'),
        "birthday": data.get('birthday'),
        "mobileNumber": data.get('mobileNumber'),
        "password": data.get('password'),
      }),
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data['data']['user']);
      if (!data['success']) {
        alert(data['message'])
        return
      }

      setUser(data['data']['user']);
      setAuthenticated(data['data']['authenticated']);
      console.log(authenticated);
      if (data['data']['authenticated']) {
        dispatch(login());
        dispatch(setUserId(data['data']['id']));
        navigate("/");
      }      
      }
    )
  };

  return (
    <>
      <Header></Header>
      <ThemeProvider theme={ theme }>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First name"
                name="firstName"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last name"
                name="lastName"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="birthday"
                label="Birthday (DD/MM/YYYY)"
                name="birthday"
                type="text"
                // autoComplete="birthday"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="degree"
                label="Degree e.g Software Engineering"
                name="degree"
                autoComplete="degree"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="mobileNumber"
                label="Mobile Number"
                name="mobileNumber"
                autoComplete="mobileNumber"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="rePassword"
                label="Re-enter password"
                type="password"
                id="rePassword"
                // autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>

  );
}