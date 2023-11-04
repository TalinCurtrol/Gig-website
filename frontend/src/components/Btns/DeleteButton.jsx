import React, { useState } from 'react'
import { IconButton, Dialog, DialogTitle, Button, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import { DeleteOutline } from '@mui/icons-material';

export default function DeleteWarning({ handleDelete, id }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton>
        <DeleteOutline onClick={() => setOpen(true)} />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Warning
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button autoFocus onClick={() => {handleDelete(id); setOpen(false)}}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
