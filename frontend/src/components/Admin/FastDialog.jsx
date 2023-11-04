import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, CardActions } from '@mui/material';
import { Link } from "react-router-dom";
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import UserList from './UserList';

export default function FastDialog({ openflag, setOpenFlag, operation, entityType, functionId }) {
    return (
        <>
            <Dialog open={openflag} onClose={() => {
                setOpenFlag(false);
            }}>
                <DialogTitle>{operation} a {entityType}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                     
                    </DialogContentText>
                    <Box component="form" onSubmit={(e) => {


                        const data = new FormData(e.currentTarget);

                        if (entityType === "user" && functionId === "2") {
                            fetch('http://localhost:8080/updateUser', {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    "id": data.get('id'),
                                    "firstName": data.get('fname'),
                                    "lastName": data.get('lname'),
                                    "email": null,
                                    "password": null,
                                    "birthday": data.get('bthday'),
                                    "degree": data.get('degree'),
                                    "mobileNumber": data.get('mnumber')
                                })
                            });

                        }
                        if (entityType === "post" && functionId === "2") {
                            fetch('http://localhost:8080/updatepost', {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    "id": data.get('id'),
                                    "title": data.get('title'),
                                    "description": data.get('description'),
                                    "publisherId": null,
                                    "publisher":null,
                                    "accepterId": null,
                                    "accepter":null,
                                    "state":null,
                                    "reward": data.get('reward'),
                                    "createdTime": null
                                   
                                })
                            });

                        }
                        if (entityType === "comment" && functionId === "2") {
                            fetch('http://localhost:8080/updateComment', {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    "id": data.get('id'),
                                    "userId": null,
                                    "requestId": data.get('pid'),
                                    "commentUserId": null,
                                    "commentedTime": null,
                                    "content": data.get('content')
                                    
                                })
                            });

                        }
                        if (functionId === "1") {
                            if (entityType === "user") {
                                console.log("user 1 0");
                                fetch('http://localhost:8080/banauser', {
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        "userid": data.get('deleteid'),
                                        "blockState": null
                                      
                                    })
                                })
                            }
                            if (entityType === "post") {
                                fetch('http://localhost:8080/deletePost/' + data.get('deleteid'), {
                                    method: "DELETE"

                                });
                            }
                            if (entityType === "comment") {
                                fetch('http://localhost:8080/deleteComment/' + data.get('deleteid'), {
                                    method: 'DELETE'
                                })
                            }
                            

                        }

                        setOpenFlag(false);
                        



                    }}>
                        {entityType === "user" && functionId === "2" ? (<>


                            <TextField
                                required
                                margin="dense"
                                key="ids"

                                label="User Id"
                                type="text"
                                name="id"
                                fullWidth
                                variant="standard"
                            />
                            <TextField

                                margin="dense"
                                key="fname"
                                label="New Firstname"
                                type="text"
                                name="fname"
                                fullWidth

                                variant="standard"
                            />
                            <TextField

                                margin="dense"
                                key="lname"
                                label="New Lastname"
                                type="text"
                                name="lname"
                                fullWidth

                                variant="standard"
                            />
                            <TextField

                                margin="dense"
                                key="bthday"
                                label="New Birthday"
                                type="text"
                                name="bthday"
                                fullWidth

                                variant="standard"
                            />

                            <TextField

                                margin="dense"
                                key="degree"
                                label="New Degree"
                                type="text"
                                name="degree"
                                fullWidth

                                variant="standard"
                            />

                            <TextField

                                margin="dense"
                                key="mnumber"
                                label="New mobile number"
                                type="text"
                                name="mnumber"
                                fullWidth

                                variant="standard"
                            />                        </>) :(<></>) }
                      
                        {functionId === "1" ? (<TextField
                            required
                            margin="dense"
                            key="deleteid"

                            label="Id"
                            type="text"
                            name="deleteid"
                            fullWidth
                            variant="standard"
                        />) : (<></>)}

                        {entityType === "post" && functionId === "2" ? (<>


                            <TextField
                                required
                                margin="dense"
                                key="id"

                                label="Post Id"
                                type="text"
                                name="id"
                                fullWidth
                                variant="standard"
                            />
                            <TextField

                                margin="dense"
                                key="reward"
                                label="New Reward"
                                type="text"
                                name="reward"
                                fullWidth

                                variant="standard"
                            />
                            <TextField

                                margin="dense"
                                key="title"
                                label="New Title"
                                type="text"
                                name="title"
                                fullWidth

                                variant="standard"
                            />
                            <TextField

                                margin="dense"
                                key="description"
                                label="New Description"
                                type="text"
                                name="description"
                                fullWidth

                                variant="standard"
                            />    </>) : (<></>)}

                        {entityType === "comment" && functionId === "2" ? (<>


                            <TextField
                                required
                                margin="dense"
                                key="id"

                                label="Comment Id"
                                type="text"
                                name="id"
                                fullWidth
                                variant="standard"
                            />
                            <TextField

                                margin="dense"
                                key="pid"
                                label="New post Id"
                                type="text"
                                name="pid"
                                fullWidth

                                variant="standard"
                            />
                            <TextField

                                margin="dense"
                                key="content"
                                label="New Content"
                                type="text"
                                name="content"
                                fullWidth

                                variant="standard"
                            />
                                                  </>) : (<></>)}

                 

                        <DialogActions>
                            <Button onClick={() => {
                                setOpenFlag(false);
                            }}>Cancel</Button>
                            <Button
                                type="submit"
                            >Confirm</Button>
                        </DialogActions>
                    </Box>
                </DialogContent>

            </Dialog>











        </>
        
        );

}