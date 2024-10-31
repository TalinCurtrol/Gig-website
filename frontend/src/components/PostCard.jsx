import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

export default function PostCard({ post }) {
    const [dis, setDis] = useState(false);
    const userId = useSelector(state => state.user.id)

    const handleApply = (postId) => {
        fetch('http://localhost:8080/applyPost', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "postId": postId,
                "userId": userId
            })
        })
        // window.location.replace('http://127.0.0.1:3000/')
        setDis(true)
    };

    return (
        <Grid item xs={12} md={6} lg={4}>
            <div hidden={true}>{post.id}</div>
            <Card>
                <CardHeader
                    title={post.title}
                    subheader={post.createdTime}
                />
                <CardContent>
                    <Typography variant="body2">
                        {post.description}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body3">
                        Post by: {post.publisher}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button component={Link} to={"/taskDetail?id=" + post.id} >View</Button>
                    <Button onClick={() => handleApply(post.id)} disabled={dis || post.isApplied}>Apply</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}
