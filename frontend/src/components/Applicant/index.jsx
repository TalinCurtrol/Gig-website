import React, { useState, useEffect } from 'react';
import Header from '../Header'
import ApplicantCard from './ApplicantCard';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, setUserId, setIsBlockedToTrue, setIsBlockedToFalse } from '../../redux/UserSlice'

export default function Applicant() {
    const [applicants, setApplicants] = useState([]);
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.id)
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        fetch('http://localhost:8080/applicant/' + params.get('id'))
            .then(response => response.json())
            .then(data => setApplicants(data['data']['applicants']))
    }, [])

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
            <Grid container spacing={1}>
                {
                    applicants.length === 0 ? <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}><Alert severity="info" >No applicant yet</Alert> </div>
                    : applicants.map((applicant, key) => (
                        <ApplicantCard applicant={applicant}></ApplicantCard>
                    ))
                }
            </Grid>

        </>
    )
}
