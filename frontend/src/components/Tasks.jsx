import React, { useState, useEffect } from 'react'
import Header from './Header'
import TasksCard from './TasksCard'
import Grid from '@mui/material/Grid'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Button } from "@mui/material";
import jwt_decode from "jwt-decode";
import SideDrawer from './SideDrawer';
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, setUserId, setIsBlockedToTrue, setIsBlockedToFalse } from '../redux/UserSlice'
import Alert from '@mui/material/Alert';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{ height: "100%", width: "100%" }}
            {...other}
        >
            {value === index && (
                <Box sx={{ height: "100%", width: "100%",p:3}}>
                   {children}
               </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Tasks() {
    // const [tasks, setTasks] = useState({});
    const [newTasks, setNewTasks] = useState([]);
    const [ongoingTasks, setOngoingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const [disIhaveComplete, SetDisIhaveComplete] = useState(false)


    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.id)
    const navigate = useNavigate();
    const [tabvalue, setTabvalue] = React.useState(0);

    const handleTabChange = (event, newTabvalue) => {
        setTabvalue(newTabvalue);
    };

    const handleDelete = (id) => {
        fetch('http://localhost:8080/deletePost/' + id, {
            method: 'DELETE'
        })
        const l = newTasks.filter(task => task.id !== id)
        setNewTasks(l)
    }

   

    const handleComplete = (postId) => {
        fetch('http://localhost:8080/task/complete', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "postId": postId,
                "userId": userId
            })
        });
        SetDisIhaveComplete(true)
    }

    const handleConfirm = (postId) => {
        fetch('http://localhost:8080/task/confirmComplete', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "postId": postId
            })
        });
        setTimeout(function () {
            window.location.replace('http://127.0.0.1:3000/tasks')
        }, 500);
    }


    useEffect(() => {
        fetch('http://localhost:8080/tasks/' + userId)
            .then(response => response.json())
            .then(data => {
                setNewTasks(data['data']['tasks']['newTasks'])
                setOngoingTasks(data['data']['tasks']['ongoingTasks']);
                setCompletedTasks(data['data']['tasks']['completedTasks']);
            })
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

    return (
        <>
            <Header></Header>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
            >
                <Tabs
                    orientation="vertical"
                    value={tabvalue}
                    onChange={handleTabChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="My Posts" {...a11yProps(0)} />
                    <Tab label="Ongoing Tasks" {...a11yProps(1)} />
                    <Tab label="Completed Tasks" {...a11yProps(2)} />

                </Tabs>
                <TabPanel value={tabvalue} index={0}>
                    <Grid container spacing={3}>
                        {
                            newTasks.length === 0 ? <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}><Alert severity="info" >No task yet</Alert> </div> : newTasks.map((post, key) => (
                                <TasksCard key={key} post={post} role={1} handleDelete={handleDelete} />
                            ))
                        }

                    </Grid>
                </TabPanel>
                <TabPanel value={tabvalue} index={1}>
                    <Grid container spacing={3}>
                        {
                            ongoingTasks.length === 0 ? <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}><Alert severity="info" >No task yet</Alert> </div> : ongoingTasks.map((post, key) => (
                                <TasksCard key={key} post={post} role={2} handleComplete={handleComplete} handleConfirm={handleConfirm} disIhaveComplete={disIhaveComplete} />
                            ))}
                </Grid>
                </TabPanel>
                <TabPanel value={tabvalue} index={2}>
                    <Grid container spacing={3}>
                        {
                            completedTasks.length === 0 ? <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}><Alert severity="info" >No task yet</Alert> </div> : completedTasks.map((post, key) => (
                                <TasksCard key={key} post={post} role={3} />
                            ))
                        }
                    </Grid>
                </TabPanel>

            </Box>
        </>

    )
}