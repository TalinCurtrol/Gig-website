import React, { useState, useEffect } from 'react'
import { colors, createTheme, Typography } from '@mui/material'
import Header from './Header'
import PostCard from './PostCard'
import Grid from '@mui/material/Grid'
import { Button } from "@mui/material";
import jwt_decode from "jwt-decode";
import SideDrawer from './SideDrawer';
import RequestDialogue from './RequestDialogue';
import MenuDial from './MenuDial';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import TranslateIcon from '@mui/icons-material/Translate';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Navigate, useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
// Redux Imports
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, setUserId, setIsBlockedToTrue, setIsBlockedToFalse } from '../redux/UserSlice'

import Alert from '@mui/material/Alert';


export default function Home() {

  // Redux Code
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const dispatch = useDispatch()
  const userId = useSelector(state => state.user.id)
    const navigate = useNavigate();
    const [translationOpen, setTranslationOpen] = useState(false)
    const [translation, setTranslation] = useState()
    const [language, setLanguage] = useState("fr")
    const [sentence, setSentence] = useState("")

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/posts/' + userId)
      .then(response => response.json())
      .then(data => setPostList(data['data']['posts']))
  }, [userId])

    useEffect(() => {
        setInterval(() => {
            
                console.log("block check!")
                fetch('http://localhost:8080/checkuserblocked/userid=' + userId)
                    .then(response => response.json())
                    .then(data => {
                        if (data['data']['ifblocked']) {
                            dispatch(logout());
                            navigate("/login");
                        }
                    })
            
            

           
        }, 5000);

       
    }, []);

    function handleTranslate() {
        fetch('http://localhost:8080/dotranslate', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "targetLanguage": language,
                "sentence": sentence,

            })

        }).then(response => response.json())
            .then(data => {
                setTranslation(data['data']['translated'])
            });

    }

  //why does it have spacing around the appbar
  return (
    <>
      <Header></Header>
      {/* <Button onClick={handleSubmit} color="inherit">Test Submit</Button> */}
      {/* <h1>Posts</h1> */}
      <Typography variant='h3' component='div' sx={{ flexGrow: 1 }} align='center'>
        Posts
          </Typography>
      <Divider />
      <br />
      <Grid container spacing={1}>

        {
          !isLoggedIn ? <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}><Alert severity="warning" >Please login to see the posts </Alert> </div>:
            postList.length === 0 ? <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}><Alert severity="info" >No post yet</Alert> </div> :
            postList.map((post, key) => (
        <PostCard key={key} post={post}></PostCard>
        ))
        }

          </Grid>

          
          <IconButton onClick={() => setTranslationOpen(true)}>
              <div class='translate-button'>
                  <TranslateIcon fontSize='large' />
              </div>
          </IconButton>
         
          <Dialog open={translationOpen} onClose={() => {
              setTranslationOpen(false);
          }}>
              <DialogTitle>Translation</DialogTitle>
              <DialogContent>
                  <DialogContentText>
                      Please put the text you want to translate here :
                  </DialogContentText>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-simple-select-label">Translate To</InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          id="language"
                          value={language}
                          label="language"
                          name="language"
                          onChange={(event) => setLanguage(event.target.value)}
                      >
                          <MenuItem value={"fr"}>Frence</MenuItem>
                          <MenuItem value={"zh"}>Chinese</MenuItem>
                          <MenuItem value={"it"}>Italian</MenuItem>
                          <MenuItem value={"ja"}>Japanese</MenuItem>
                          <MenuItem value={"pt"}>Portuguese</MenuItem>
                          <MenuItem value={"ru"}>Russian</MenuItem>
                          <MenuItem value={"ar"}>Arabic</MenuItem>
                      </Select>
                  </FormControl>
                  <TextField
                      autoFocus
                      multiline
                      rows={6}
                      key="text"
                      variant="outlined"
                      label="Text in English"
                      type="text"
                      name="text"
                      value={sentence}
                      onChange={(e) => {
                          setSentence(e.target.value);

                      }}
                      fullWidth

                  />


                  <div>  </div>
                  <TextField
                      sx={{ m: 1 }}
                      focused
                      multiline
                      rows={6}
                      key="translation"
                      defaultValue={translation}
                      label="Translation"
                      type="text"
                      name="translation"
                      fullWidth
                      variant="outlined"
                  />


                  <DialogActions>
                      <Button onClick={handleTranslate}>Translate</Button>

                      <Button onClick={() => {
                          setTranslationOpen(false);
                          setTranslation("");
                          setSentence("");
                      }}>Close</Button>
                  </DialogActions>

              </DialogContent>

          </Dialog>
      {/* <SideDrawer/> */}
      {
        isLoggedIn ? <RequestDialogue postList={postList} setPostList={setPostList}></RequestDialogue>: ""
      }
      {/* <MenuDial></MenuDial> */}
      {/* <Typography variant='h1'>{isLoggedIn.toString()}</Typography>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      <Typography variant='h1'>{count}</Typography>
      <Button onClick={() => dispatch(increment())}>Increment</Button>

      <Button onClick={() => handleTranslate("test")}>Increment</Button> */}
    </>
  )
}
