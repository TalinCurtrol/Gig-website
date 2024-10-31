import React, { useState, useEffect } from 'react'
import Header from '../Header'
import Grid from '@mui/material/Unstable_Grid2';
import { Avatar, Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function Profile() {

    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      };

    return(
        <List sx={style} component="nav" aria-label="mailbox folders">
            <ListItem button>
                <ListItemText primary="Messages" />
            </ListItem>
        <Divider light />
            <ListItem button>
                <ListItemText primary="Favourited" />
            </ListItem>
        </List>
    )
    
}