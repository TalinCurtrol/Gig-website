import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button, CardActions, IconButton } from '@mui/material'
import DeleteButton from "./Btns/DeleteButton";
import { Link } from "react-router-dom";
import { useState } from 'react';
import TaskDialogue from './Dialogue/TaskDialogue';


// add menudial for each card


export default function TasksCard({ post, role, handleDelete, handleComplete, handleConfirm , disIhaveComplete }) {
    
    const [openEdit, setOpenEdit] = useState(false);

    const handleClose = (e) => {
        e.preventDefault();
        setOpenEdit(false);
    };

    return (

        <Grid item xs={12} md={6} lg={4}>
            <Card elevation={3}>

                <CardHeader
                    title={<Typography sx={{ fontSize: 18 }}>{post.title}</Typography>}
                    avatar={
                        role === 1 ? "" : post.isOwner ? <Typography sx={{ fontSize: 14 }} color="red" variant="overline" >my post</Typography> : <Typography sx={{ fontSize: 14 }} color="green" variant="overline">other's post</Typography>
                    }
                    subheader={post.createdTime}
                    action={
                        role === 1 ? <DeleteButton id={post.id} handleDelete={handleDelete} /> : ""
                    }
                />
                <CardContent >
                    <Typography variant="body2">
                        {post.description}
                    </Typography>
                </CardContent>
                <CardContent>
                    {role === 1 ? "" : <Typography sx={{ fontSize: 14 }} color="text.secondary">Post by: {post.publisher}</Typography>}
                </CardContent>
                <CardActions>
                    <Button component={Link} to={"/taskDetail?id=" + post.id} >View</Button>
                    {
                        role === 1 ? <Button onClick={()=>setOpenEdit(true)}>Edit</Button> : ""
                    }
                    <TaskDialogue openEdit={openEdit} handleClose={handleClose} post={post}></TaskDialogue>
                    {
                        role === 1 ? <Button component={Link} to={"/applicant?id=" + post.id} >Applicants</Button> : ""
                    }
                    {
                        role === 2 ?
                            (
                                post.isOwner ? (post.didReceiveComplete ? <Button onClick={() => handleConfirm(post.id)}>Confirm Completion</Button> : "") : <Button disabled={disIhaveComplete || post.didSentComplete} onClick={() => handleComplete(post.id)}>Click To Complete</Button>
                            )
                            :
                            ""
                    }
                </CardActions>

            </Card>
        </Grid >

    )
}
