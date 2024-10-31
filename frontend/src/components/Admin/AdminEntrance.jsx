import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useNavigate } from "react-router-dom";


// Redux Imports
import { useSelector, useDispatch } from 'react-redux'
import { adminLogin, adminLogout, setAdminId, setAdminName } from '../../redux/AdminSlice'





export default function AdminEntrance() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#cddc39",
            },
            secondary: {
                main: "#c6ff00",
            },
        },
    });
    var loginValue = useSelector(state => state.admin.loginValue);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        const data = new FormData(e.currentTarget);
        e.preventDefault();
        fetch('http://localhost:8080/adminlogin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "adminName": data.get('adminName'),
                "password": data.get('password'),
            }),
        })
            .then(response => response.json())
            .then(data => {
               
                if (data['data']['correct']) {
                   
                    dispatch(adminLogin());
                    dispatch(setAdminId(data['data']['id']));
                    dispatch(setAdminName(data['data']['adminName']));
                    
                    navigate("/welcome");
                } else {
                    document.getElementById("errorInfo").innerHTML = "Invalid email or password.";
                    dispatch(adminLogout());
                }
            }
            )
    };

    return (
        <>

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 24,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <AdminPanelSettingsIcon color="success" fontSize="large" />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Administrator Log in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="adminName"
                                label="adminName"
                                name="adminName"
                                autoComplete="current-password"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Typography id="errorInfo" color="red"></Typography>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Log in
                            </Button>
                     
                            <span >
                                <Link href="/login" variant="body2">
                                    I'm a normal user.
                                </Link>
                            </span>


                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}