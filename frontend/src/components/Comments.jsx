import React, { useState, useEffect } from 'react'
import { colors, createTheme, Typography } from '@mui/material'
import Header from './Header'
import PostCard from './PostCard'
import Grid from '@mui/material/Grid'
import jwt_decode from "jwt-decode";
import SideDrawer from './SideDrawer';
import RequestDialogue from './RequestDialogue';
import MenuDial from './MenuDial';
import { Avatar, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CommentCard from './CommentCard'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux'

export default function Comments({ detail }) {

    const [comments, setComments] = useState([]);
    const userId = useSelector(state => state.user.id);

    const handlePost = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const content = data.get('content')

        if (!content) {
            alert("Cannot send empty comment")
            return
        }

        fetch('http://localhost:8080/saveComment', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "content": content,
                "requestId": detail.id,
                "userId": userId,
            })
        })
        setTimeout(function () {
            window.location.reload()
        }, 200);
    };

    useEffect(() => {
        fetch('http://localhost:8080/commentlist/postid=' + detail.id)
            .then(response => response.json())
            .then(data => {
                setComments(data['data']['comments']);
            })
    }, [detail])

    return (
        <Card
            sx={{
                minWidth: 800,
                minHeight: 800,
                borderRadius: 5,
                margin: 10,
                boxShadow: 10,
                opacity: 1
            }}
            style={{
                backgroundColor: "white"
            }}
        >
            <CardContent>
                <Grid container>
                    <Grid>
                        <Typography style={{
                            color: "#2196f3",
                            fontWeight: 'bold',
                            fontSize: 30
                        }}
                        >
                            Comments
                        </Typography>
                    </Grid>
                    <Box width="100%" /> {/* basically adds a new row */}
                    <Grid container spacing={0}>
                        {
                            comments.map((comment, key) => (
                                <CommentCard key={key} comment={comment}></CommentCard>
                            ))
                        }
                    </Grid>
                    <Grid xs={10}>
                        <Box component="form" onSubmit={handlePost}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="comment"
                                label="Write your comment here"
                                name="content"
                                autoFocus />
                            <Button
                                type="submit"
                            >
                                Send
                            </Button>
                        </Box>
                    </Grid>
                    <Grid xs={2}>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>


    )
}
