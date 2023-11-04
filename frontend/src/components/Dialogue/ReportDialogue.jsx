import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import './ReportDialogue.css';
import { useSelector } from 'react-redux'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

export default function ReportDialogue({ postId }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const handleClose = (e) => {
        e.preventDefault();
        setOpen(false);
    };

    const userId = useSelector(state => state.user.id)

    const handlePost = (event) => {
        event.preventDefault();
        
        const data = new FormData(event.currentTarget);

        const description = data.get('description')

        if (!description) {
            alert("Please fill in the description!")
            return;
        }

        fetch('http://localhost:8080/reportProblem', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userId": userId,
                "postId" : postId,
                "description": description
            }),
        })

        alert("Thank you for your report! Our admin will check this problem as soon as possible!")
        window.location.reload()
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <div class='new-request-button'>
                    <ReportProblemIcon fontSize='large' />
                </div>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Report Problem</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Describe your problem about this task
                    </DialogContentText>
                    <Box component="form" onSubmit={handlePost}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="outlined"
                            multiline
                        />
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
                                Submit
                            </Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
