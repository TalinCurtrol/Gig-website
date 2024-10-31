import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import MapAPI from '../MapAPI';
import {useState} from 'react';

export default function TaskDialogue({ openEdit , handleClose, post }) {
    //Map API functionality
    const [open, setOpen] = useState(false);
    const [markerPosition, setMarkerPosition] = useState(post.location);
    
    const [markerIsVisibleState, setMarkerIsVisibleState] = useState(post.markerIsVisible);

    const getMarkerPosition = (markerPosition, visible) => {
        setMarkerPosition(markerPosition);
        setMarkerIsVisibleState(visible);
        console.log(markerPosition);
        console.log(visible);
    }
    
    //Handle submission of edit form
    const handlePost = (event) => {
        const data = new FormData(event.currentTarget);

        const title = data.get('title')
        const description = data.get('description')
        const reward = data.get('reward')
        const location = markerPosition
        const markerIsVisible = markerIsVisibleState

        if (!title || !description || !reward) {
            event.preventDefault()
            alert("Please fill in all the information!")
            return;
        }

        fetch('http://localhost:8080/editTask', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id" : post.id,
                "title": title,
                "description": description,
                "reward": reward,
                "location":JSON.stringify(location),
                "markerIsVisible": markerIsVisible,
            }),
        })

        setTimeout(function () {
            window.location.replace('http://127.0.0.1:3000/tasks')
        }, 500);
    };

    return (
        <div>
            <Dialog open={openEdit}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update your task here
                    </DialogContentText>
                    <Box component="form" onSubmit={handlePost}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="outlined"
                            defaultValue={post.title}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="reward"
                            label="Reward"
                            type="text"
                            fullWidth
                            variant="outlined"
                            multiline
                            defaultValue={post.reward}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="description"
                            label="Write your request"
                            type="text"
                            fullWidth
                            variant="outlined"
                            multiline
                            defaultValue={post.description}
                        />
                        <MapAPI sendMarkerPosition={getMarkerPosition} initMarkerPosition={post.location} visible={post.markerIsVisible}></MapAPI>
                        <DialogActions>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update
                            </Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
