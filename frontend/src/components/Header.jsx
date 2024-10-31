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
import { create } from '@mui/material/styles/createTransitions';
import Avatar from '@mui/material/Avatar';
import AccountMenu from './AccountMenu';

import Box from '@mui/material/Box';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/UserSlice'

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
    },
  });

export default function Header() {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false)
    const userId = useSelector(state => state.user.id)
 
    
    useEffect( () => {
        console.log("Header" + authenticated);
      }
    )

    
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
                        USYD Helper
                    </Typography>
                    <Stack direction='row' spacing={2}>
                        <Button component={Link} to="/" color="inherit">Home</Button>
                               
                        { isLoggedIn ?  
                            (
                                <>
                                    <Button component={Link} to="/tasks" color="inherit">Tasks</Button>
                                    <AccountMenu authenticated={authenticated} setAuthenticated={setAuthenticated} userId={userId}></AccountMenu>
                                </>
                            
                            )
                            : 
                            (
                                <Button component={Link} to="/login" color="inherit">
                                    Login
                                </Button>
                            )
                        }
                    </Stack>
                </Toolbar>
            </AppBar> 
        </ThemeProvider>
        // <AppBar position="sticky">
        //     <Toolbar>
        //         <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
        //             USYD Helper
        //         </Typography>
        //         <Stack direction='row' spacing={2}>
        //             <Button component={Link} to="/tasks" color="inherit">Tasks</Button>
        //             {authenticated ?  
        //             <Button onClick={() => {
        //                 localStorage.setItem("authenticated", false);
        //                 setAuthenticated(false)}} color="inherit">Logout
        //             </Button> 
        //             : 
        //             <Button component={Link} to="/login" color="inherit">Login</Button>}
        //         </Stack>
        //     </Toolbar>
        // </AppBar>
    )
}
