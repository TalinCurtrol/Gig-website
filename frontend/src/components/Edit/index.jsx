import React, { useState, useEffect } from 'react'
import Header from '../Header'
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { Avatar, Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListDivider from '../Profile/ListDivider';
import profilePhoto from '../resources/profile.jpg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { fontWeight } from '@mui/system';
import { PanoramaSharp, RoundaboutLeft } from '@mui/icons-material';
import Comments from '../Comments'
import CommentCard from '../CommentCard'
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';

// Redux Imports
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, setUserId, setIsBlockedToTrue, setIsBlockedToFalse } from '../../redux/UserSlice'

export default function Edit() {

    const dispatch = useDispatch()
   
    const navigate = useNavigate();

  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const count = useSelector(state => state.user.counter)
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [authenticated, setAuthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
  const [inputValue, setInputValue] = useState('');
  const userId = useSelector(state => state.user.id)
  const params = new URLSearchParams(window.location.search)
  const profileUserId = params.get('id')
  
  //function formatDate(date1) {
    //const dateinput = date1.toString().split("-");
    //const date = dateinput[2]+"/"+dateinput[1]+"/"+dateinput[0];
    //return date;
  //}

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    fetch('http://localhost:8080/user/' + params.get('id'))
      .then(response => response.json())
      .then(data => {
        setUser(data['data']['user']);
        // setComments(data['data']['comments']);
        // console.log(user.birthday);
      })

  }, []);

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
  const setValue = (e)=>{
    let value = e.target.value;
    let name = e.target.name;
        this.setUser({
            [name]: value
        })

  };
  const prohibitRefresh = (e) => {
    e.preventDefault() || (e.returnValue = false);  
};
  const updateUser = (e) => {
    
  prohibitRefresh(e)
  const data = new FormData(e.currentTarget);
    // const data = new FormData(e.currentTarget)
    const id = Number(data.get('id'));
    const firstname = data.get('firstName').toString();
    const lastname = data.get('lastName').toString();
   const birthday = data.get('birthday').toString();
    const degree = data.get('degree').toString();
    const number = data.get('mobileNumber').toString();
    fetch('http://localhost:8080/updateUser', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "id": id,
        "firstName": firstname,
        "lastName": lastname,
        "email": null,
        "password": null,
        "birthday": birthday,
        "degree": degree,
        "mobileNumber": number
      })
    })
      .then(response => response.json())
      .then(data => {
        if (!data['success']) {
          alert(data['message'])
        }
        window.location = "/profile?id=" + id
        // window.location.href()
      }
      )
  };
  return (
    <>
      <Header />
      <Card
        sx={{
          minWidth: 800,
          minHeight: 300,
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
          <Box  component="form" 
              onSubmit={(e) => updateUser(e)}>
            <TextField
              hidden="true"
              id="id"
              name="id"
              value={user.id}
              autoFocus
              hideLabel="true"
              style={{
                display: 'none'
              }}
            />
            <Typography style={{
              fontSize: 20
            }}
            >
              Firstname
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              name="firstName"
              value={user.firstName}
              onChange={(e) => { setUser(e.target.value) }}
              autoFocus
            />
            <Typography style={{
              fontSize: 20
            }}
            >
              Lastname
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              name="lastName"
              value={user.lastName}
              onChange={(e) => { setUser(e.target.value) }}
              autoFocus
            />

            <Typography style={{
              fontSize: 20
            }}
            >
              Birthday
            </Typography>
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="birthday"
              //value={formatDate(user.birthday)}
              value={user.birthday}
              type="text"
              id="birthday"
              onChange={(e) => { setUser(e.target.value) }}
            />
 {/*  */}
            <Typography style={{
              fontSize: 20
            }}
            >
              Degree
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="degree"
              value={user.degree}
              onChange={(e) => { setUser(e.target.value) }}
              id="degree"
            />
            <Typography style={{
              fontSize: 20
            }}
            >
              Phone Number
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="mobileNumber"
              value={user.mobileNumber}
              id="mobileNumber"
              onChange={(e) => { setUser(e.target.value) }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}

            >
              Update
            </Button>
            {
                                userId.toString() === profileUserId ? <Button component={Link} to={ '/changepassword?id=' + userId }>
                                Change Password
                            </Button> : ''
                            }
          </Box>
        </CardContent>
      </Card>
    </>
  )
}