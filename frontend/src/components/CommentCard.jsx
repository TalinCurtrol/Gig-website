import React, { useState, useEffect } from 'react'
import {colors, createTheme, TextField, Typography} from '@mui/material'
import Header from './Header'
import PostCard from './PostCard'
import Grid from '@mui/material/Grid'
import {Button} from "@mui/material";
import jwt_decode from "jwt-decode";
import SideDrawer from './SideDrawer';
import RequestDialogue from './RequestDialogue';
import MenuDial from './MenuDial';
import { Avatar, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { setUserId } from '../redux/UserSlice'


export default function CommentCard( {comment} ) {  

    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/user/' + comment.userId)
        .then(response => response.json())
        .then(data => {
            setUser(data['data']['user']); 
        })
    }, [comment])

    return (
        <>
        <Grid container>
            <Grid item xs={1} p={2}>
                <Avatar>{user.id}</Avatar>
            </Grid>        
            <Grid p={1}>
                <Typography variant="body2" fontWeight='bold'>
                    {user.firstName + " " + user.lastName} 
                </Typography>
                <Typography variant="body2">
                    {comment.content}
                </Typography>
                <Typography variant="body2">
                    {comment.commentedTime}
                </Typography>
            </Grid>        
        </Grid>
        </>
    )
}
