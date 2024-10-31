// import * as React from 'react';
import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
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
import { getOptionGroupUnstyledUtilityClass } from '@mui/base';
import jwt_decode from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import Header from '../Header';
import Alert from '@mui/material/Alert';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux'
import { login, setUserId } from '../../redux/UserSlice'





export default function Login() {
  const theme = createTheme();
  const [googleUser, setGoogleUser] = useState({});
  const [user, setUser] = useState('');
  const [authenticated, setAuthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
  const [emailcheck, setEmailcheck] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // function handleCallBackResponse(response) {
  //  console.log("Success log in with Google. JWT Web Token: " + response.credential); 
  //  var googleUser = jwt_decode(response.credential);
  //  console.log(googleUser);
  // //  setGoogleUser(googleUser);
  // }

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id: "698062565488-maejvpo02a3jbpd0ud83pp220ggt7qc5.apps.googleusercontent.com",
  //     callback: handleCallBackResponse
  //   });
  //   google.accounts.id.renderButton(
  //     document.getElementById("googleSignInDiv"),
  //     { size: "large"}
  //   )
  //  }, []);


  // const [token, setToken] = useState();

  const handleSubmit = (e) => {

    const data = new FormData(e.currentTarget);
    e.preventDefault();

    fetch('http://localhost:8080/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": data.get('email'),
        "password": data.get('password'),
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAuthenticated(data['data']['authenticated']);
        console.log(authenticated);

        if (data['data']['authenticated']) {
          dispatch(login());
          dispatch(setUserId(data['data']['id']));
          navigate("/");
        } else {
          alert(data['message'])
        }
      }
      )
  };

  return (
    <>
      <Header></Header>

      <ThemeProvider theme={theme}>
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
              Log in
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <div id="googleSignInDiv"></div>           
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log in
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <span >
                <Link href="/adminentrance" variant="body2">
                  Admin Entrance
                </Link>
              </span>


            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}