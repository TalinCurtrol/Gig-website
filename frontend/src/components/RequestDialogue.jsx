import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import './RequestDialogue.css'
import { useSelector, useDispatch } from 'react-redux'
import MapAPI from './MapAPI';
import {useState} from 'react';

export default function FormDialog( {postList}, {setPostList} ) {

  //Map API functionality
  const [open, setOpen] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [markerIsVisibleState, setMarkerIsVisibleState] = useState(null);

  const getMarkerPosition = (markerPosition, visible) => {
    setMarkerPosition(markerPosition);
    setMarkerIsVisibleState(visible);
    console.log(markerPosition);
    console.log(visible);
  }


  //Set open and close for dialog box
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };


  //Get user id to use in http requests
  const userId = useSelector(state => state.user.id)
  
  const handlePost = (event) => {
    const data = new FormData(event.currentTarget);
    
    const title = data.get('title')
    const description = data.get('title')
    const reward = data.get('reward')
    const location = markerPosition
    const markerIsVisible = markerIsVisibleState

    if (!title || !description || !reward) {
      event.preventDefault()
      alert("Please fill in all the information!")
      return;
    }

    fetch('http://localhost:8080/newPost', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "title": data.get('title'),
        "description": data.get('description'),
        "reward": data.get('reward'),
        "publisherId": userId,
        "state":0,
        "location":JSON.stringify(location),
        "markerIsVisible": markerIsVisible,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setPostList([...postList], data['data']['post']);
  })};

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <div class='new-request-button'>
          <AddCircleIcon fontSize='large'/>
        </div>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create your own request here
          </DialogContentText>
          <Box component="form" onSubmit={handlePost}>
            <TextField
              autoFocus
              margin="dense"
              // id="title"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              // id="reward"
              name="reward"
              label="Reward"
              type="text"
              fullWidth
              variant="outlined"
              multiline
            />
            <TextField
              autoFocus
              margin="dense"
              // id="description"
              name="description"
              label="Write your request"
              type="text"
              fullWidth
              variant="outlined"
              multiline
            />
            <MapAPI sendMarkerPosition={getMarkerPosition} visible={true}></MapAPI>
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
                // onClick={handlePost}
              >
                Post
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePost}>Post</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
