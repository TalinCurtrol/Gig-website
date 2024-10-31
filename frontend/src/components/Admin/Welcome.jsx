import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import Paper from '@mui/material/Paper';
import { styled, Stack } from '@mui/system';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import { Typography, Button, createTheme,ThemeProvider} from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import CommentIcon from '@mui/icons-material/Comment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ArticleIcon from '@mui/icons-material/Article';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ContentPasteOffIcon from '@mui/icons-material/ContentPasteOff';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { adminLogin, adminLogout, setAdminId, setAdminName } from '../../redux/AdminSlice'
import FastDialog from './FastDialog';




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#e6ee9c',
    padding: theme.spacing(5),
    textAlign: 'center',
}));
const GreetingItem = styled(Paper)(({ theme }) => ({
    backgroundColor: '#e6ee9c',
    padding: theme.spacing(3),
    textAlign: 'center',
}));



export default function Welcome() {
    const login = useSelector(state => state.admin.loginValue);
    const name = useSelector(state => state.admin.adminName);

    const [user1Open, setUser1Open] = React.useState(false);
    const [user2Open, setUser2Open] = React.useState(false);
    const [user3Open, setUser3Open] = React.useState(false);

    const [post1Open, setPost1Open] = React.useState(false);
    const [post2Open, setPost2Open] = React.useState(false);
    const [post3Open, setPost3Open] = React.useState(false);

    const [comment1Open, setComment1Open] = React.useState(false);
    const [comment2Open, setComment2Open] = React.useState(false);
    const [comment3Open, setComment3Open] = React.useState(false);

    return (
        <>
            {login ? (< AdminHeader />) : (<div></div>)}

            {login ? (
                <Stack spacing={1} >
                    <GreetingItem><Typography fontSize={25}>Welcome, {name} !</Typography></GreetingItem>
                    <div></div>
                </Stack>
                
            )
                : (<div></div>)}
            
            { login?
                (<Stack spacing={1} >
                    <Item >
                        <Stack spacing={3} alignItems="center">
                            <div>
                                <Button component={Link} to="/userlist" color="inherit" size="large" startIcon={<FolderSharedIcon />}>Check All Users</Button>
                            </div>
                            <div>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Button onClick={() => setUser1Open(true)} size="medium" color="inherit" startIcon={<PersonOffIcon />}>Block A User</Button>
                                    <FastDialog openflag={user1Open} setOpenFlag={setUser1Open} operation="Ban" entityType="user" functionId="1" color="inherit" />
                                    /<Button onClick={() => setUser2Open(true)} size="medium" color="inherit" startIcon={<ManageAccountsIcon />}>Modify User Information</Button>  
                                    <FastDialog openflag={user2Open} setOpenFlag={setUser2Open} operation="Modify" entityType="user" functionId="2" color="inherit" /> 
                                    / <Button component={Link} to="/userlist" size="medium" color="inherit" startIcon={<PersonSearchIcon />}>Search A User</Button>
                                </Stack>
                            </div>
                        </Stack>
                    </Item>
                    <Item >
                        <Stack spacing={3} alignItems="center">
                            <div>
                                <Button component={Link} to="/postlist" color="inherit" size="large" startIcon={<ArticleIcon />} >Check All Posts</Button>
                            </div>
                            <div>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Button onClick={() => setPost1Open(true) } size="medium" color="inherit" startIcon={<ContentPasteOffIcon />}>Delete A Post</Button >
                                    <FastDialog openflag={post1Open} setOpenFlag={setPost1Open} operation="Delete" entityType="post" functionId="1" color="inherit" />
                                    / <Button onClick={() => setPost2Open(true) } size="medium" color="inherit" startIcon={<HistoryEduIcon />}>Modify A Post</Button >
                                    <FastDialog openflag={post2Open} setOpenFlag={setPost2Open} operation="Modify" entityType="post" functionId="2" color="inherit" />
                                    / <Button component={Link} to="/postlist" size="medium" color="inherit" startIcon={<ContentPasteSearchIcon />}>Search A Post</Button >
                                </Stack>
                            </div>
                        </Stack>
                    </Item>
                    <Item >
                        <Stack spacing={3} alignItems="center">
                            <div>
                                <Button component={Link} to="/commentlist" color="inherit" size="large" startIcon={<CommentIcon />}>Check All Comments</Button>
                            </div>
                            <div>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Button onClick={() => setComment1Open(true) } size="medium" color="inherit" startIcon={<CommentsDisabledIcon />}>Delete A Comment</Button >
                                    <FastDialog openflag={comment1Open} setOpenFlag={setComment1Open} operation="Delete" entityType="comment" functionId="1" color="inherit" />
                                    / <Button onClick={() => setComment2Open(true) } size="medium" color="inherit" startIcon={<RateReviewIcon />}>Modify A Comment</Button >
                                    <FastDialog openflag={comment2Open} setOpenFlag={setComment2Open} operation="Modify" entityType="comment" functionId="2" color="inherit" />
                                    / <Button component={Link} to="/commentlist" size="medium" color="inherit" startIcon={<LiveHelpIcon />}>Search A Comment</Button >
                                </Stack>
                            </div>
                        </Stack>
                    </Item>
                </Stack>) : (<Button component={Link} to="/adminentrance" color="inherit" size="large">You need to log in</Button>)
            }

            
        </>
       
        )

}