import React, { useState, useEffect } from 'react';
import Header from './Header'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BadgeIcon from '@mui/icons-material/Badge';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import DescriptionIcon from '@mui/icons-material/Description';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Divider } from '@mui/material';
import Comments from './Comments';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
// import CommentCard from './CommentCard';
import ReportDialogue from './Dialogue/ReportDialogue'
import MapAPI from './MapAPI';
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, setUserId, setIsBlockedToTrue, setIsBlockedToFalse } from '../redux/UserSlice'

export default function PostDetail() {
  const [detail, setDetail] = useState({});
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.id)
    const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    fetch('http://localhost:8080/detail/' + params.get('id'))
      .then(response => response.json())
      .then(data => {
        setDetail(data['data']['detail']);
        console.log(data['data']['detail']);
      })
      
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
      <Header />
      <Card>
        <CardHeader
          avatar={<CampaignIcon sx={{ fontSize: 30 }} />}
          title={<Typography sx={{ fontSize: 22 }}>{"Title: " + detail.title}</Typography>}
          subheader={<Typography sx={{ fontSize: 18 }} color="text.secondary">{"Created Time: " + detail.createdTime}</Typography>}
        />
        <Divider />

        <CardContent>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <DescriptionIcon sx={{ fontSize: 35 }} />
            </Grid>
            <Grid item>
              <Typography variant="h5" ml={1}>
                Description
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" ml={5}>
            {detail.description}
          </Typography>
        </CardContent>

        <Divider />

        <CardContent>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <EmojiEmotionsIcon sx={{ fontSize: 35 }} />
            </Grid>
            <Grid item>
              <Typography variant="h5" ml={1}>
                Reward
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" ml={5}>
            {detail.reward}
          </Typography>
        </CardContent>

        <Divider />

        <CardContent>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <AccessTimeIcon sx={{ fontSize: 35 }} />
            </Grid>
            <Grid item>
              <Typography variant="h5" ml={1}>
                Task Status
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" ml={5}>
            {detail.state}
          </Typography>
        </CardContent>

        <Divider />

        <CardContent>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <BadgeIcon sx={{ fontSize: 35 }} />
            </Grid>
            <Grid item>
              <Typography variant="h5" ml={1}>
                Publisher
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" ml={5}>
            <Link href={"/profile?id=" + detail.publisherId}>{detail.publisher}</Link>
          </Typography>
        </CardContent>

        <Divider />

        <CardContent>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <PeopleIcon sx={{ fontSize: 35 }} />
            </Grid>
            <Grid item>
              <Typography variant="h5" ml={1}>
                Accepter
              </Typography>
            </Grid>
          </Grid>
          {
            detail.accepter === "None" ? <Typography variant="h6" ml={5}>None</Typography>: 
            
            <Typography variant="h6" ml={5}><Link href={"/profile?id=" + detail.accepterId}>{detail.accepter}</Link></Typography>
          }
        </CardContent>

        <Divider />

        <CardContent>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <PeopleIcon sx={{ fontSize: 35 }} />
            </Grid>
            <Grid item>
              <Typography variant="h5" ml={1}>
                Location
              </Typography>
            </Grid>
          </Grid>
          {
            detail.location === "None" ? <Typography variant="h6" ml={5}>None</Typography>: 
            <>
              <MapAPI initMarkerPosition={detail.location} visible={Boolean(detail.markerIsVisible)}></MapAPI>
              {/* <Typography variant="h6" ml={5}><Link href={"/profile?id=" + detail.accepterId}>{detail.accepter}</Link></Typography> */}
            </>
            
          }
        </CardContent>

      </Card>
      <Comments detail={detail}></Comments>
      <ReportDialogue postId={detail.id}></ReportDialogue>
    </>
  )
}
