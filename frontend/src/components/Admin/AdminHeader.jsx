import React, { useState, useEffect } from 'react'
import {
    AppBar,
    Toolbar,
    Stack,
    Typography,
    Button,
    createTheme,
    colors,
    ThemeProvider
} from "@mui/material";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";

// Redux Imports
import { useSelector, useDispatch } from 'react-redux'
import { adminLogin, adminLogout } from '../../redux/AdminSlice'

const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    }, palette: {
        primary: {
            main:"#cddc39",
        },
        secondary: {
            main: "#c6ff00",
        },
    },
});



export default function AdminHeader() {
    const loginValue = useSelector(state => state.admin.loginValue)
    const dispatch = useDispatch();
    const navigate = useNavigate();

   
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
                        USYD Helper Management Panel
                    </Typography>
                    <Stack direction='row' spacing={2}>
                        <Button component={Link} to="/welcome" color="inherit">Home</Button>
                        <Button component={Link} to="/reportlist" color="inherit">Reports</Button>
                        <Button component={Link} to="/userlist" color="inherit">Users</Button>
                        <Button component={Link} to="/postlist" color="inherit">Posts</Button>
                        <Button component={Link} to="/commentlist" color="inherit">Comments</Button>
                        <Button onClick={() => {
                            dispatch(adminLogout());
                            navigate("/adminentrance");} } color="inherit" variant="outlined">Log Out</Button>
                       
                    </Stack>
                </Toolbar>
            </AppBar> 
        </ThemeProvider>
        
    )
}
