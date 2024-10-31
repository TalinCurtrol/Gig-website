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
import Typography from '@mui/material/Typography';
import { fontWeight } from '@mui/system';
import { PanoramaSharp, RoundaboutLeft, SettingsInputComponentOutlined } from '@mui/icons-material';
import Comments from '../Comments'
import CommentCard from '../CommentCard'
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../redux/UserSlice'

export default function Profile() {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const count = useSelector(state => state.user.counter)
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const [tasksCompleted, setTasksCompleted] = useState([]);
    const [ongoingTasks, setOngoingTasks] = useState([]);
    const [commentsSent, setCommentsSent] = useState([]);
    const userId = useSelector(state => state.user.id)
    const params = new URLSearchParams(window.location.search)
    const profileUserId = params.get('id')

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        fetch('http://localhost:8080/user/' + params.get('id'))
            .then(response => response.json())
            .then(data => {
                setUser(data['data']['user']);
                // setComments(data['data']['comments']);
                console.log(data['data']['user']);
            })

        fetch('http://localhost:8080/tasks/' + params.get('id'))
            .then(response => response.json())
            .then(data => {
                setTasksCompleted(data['data']['tasks']['completedTasks']);
                setOngoingTasks(data['data']['tasks']['ongoingTasks']);
                // setComments(data['data']['comments']);
                // console.log(data['data']['user']);
            })

        fetch('http://localhost:8080/commentlist/userid=' + params.get('id'))
            .then(response => response.json())
            .then(data => {
                setCommentsSent(data['data']['comments_sended'])
                // setComments(data['data']['comments']);
                // console.log(data['data']['user']);
            })

    }, [])

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
                    <Grid container spacing={2}>
                        <Grid>
                            <Avatar sx={{ size: 200 }} />
                        </Grid>
                        <Grid>
                            <Typography style={{
                                color: "#2196f3",
                                fontWeight: 'bold',
                                fontSize: 30
                            }}
                            >
                                {user.firstName + " "}
                                {user.lastName}
                            </Typography>
                            {
                                userId.toString() === profileUserId ? <Button component={Link} to={ '/edit?id=' + userId }>
                                Edit Profile
                            </Button> : ''
                            }

                        </Grid>

                        <Box width="100%" /> {/* basically adds a new row */}

                        <Grid>
                            <EmailIcon sx={{ size: 100 }} />
                        </Grid>
                        <Grid>
                            <Typography style={{
                                fontSize: 20
                            }}
                            >
                                {user.email}
                            </Typography>
                        </Grid>
                        <Box width="100%" />
                        <Grid>
                            <SchoolIcon sx={{ size: 100 }} />
                        </Grid>
                        <Grid>
                            <Typography style={{
                                fontSize: 20
                            }}
                            >
                                {user.degree}
                            </Typography>
                        </Grid>
                        <Box width="100%" />
                        <Grid>
                            <CakeIcon sx={{ size: 100 }} />
                        </Grid>
                        <Grid>
                            <Typography style={{
                                fontSize: 20
                            }}
                            >
                                {user.birthday}
                            </Typography>
                        </Grid>
                        <Box width="100%" />
                        <Grid>
                            <PhoneIcon sx={{ size: 100 }} />
                        </Grid>
                        <Grid>
                            <Typography style={{
                                fontSize: 20
                            }}
                            >
                                {user.mobileNumber}
                            </Typography>
                        </Grid>
                        <Box width="100%" />

                        <Grid xs={4}>
                            <Typography style={{
                                color: "#2196f3",
                                fontWeight: 'bold',
                                fontSize: 30
                            }}
                            >
                                Tasks Completed
                            </Typography>
                            <Typography style={{
                                color: "grey",
                                fontWeight: 'bold',
                                fontSize: 25
                            }}
                            >
                                {tasksCompleted.length}
                            </Typography>
                        </Grid>
                        <Grid xs={4}>
                            <Typography style={{
                                color: "#2196f3",
                                fontWeight: 'bold',
                                fontSize: 30
                            }}
                            >
                                Ongoing Tasks
                            </Typography>
                            <Typography style={{
                                color: "grey",
                                fontWeight: 'bold',
                                fontSize: 25
                            }}
                            >
                                {ongoingTasks.length}
                            </Typography>
                        </Grid>
                        <Grid xs={4}>
                            <Typography style={{
                                color: "#2196f3",
                                fontWeight: 'bold',
                                fontSize: 30
                            }}
                            >
                                Comments
                            </Typography>
                            <Typography style={{
                                color: "grey",
                                fontWeight: 'bold',
                                fontSize: 25
                            }}
                            >
                                {commentsSent.length}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Grid container spacing={1}>
            </Grid>
        </>
    )
}