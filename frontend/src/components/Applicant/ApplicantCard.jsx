import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import Link from '@mui/material/Link';

export default function ApplicantCard({ applicant }) {
  const handleClick = () => {
    const params = new URLSearchParams(window.location.search)
    fetch('http://localhost:8080/acceptApplicant', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "postId": params.get("id"),
        "userId": applicant.id
      })
    })
    setTimeout(function () {
      window.location.replace('http://127.0.0.1:3000/tasks')
    }, 500);
  };

  return (
    <Grid item xs={12} md={6} lg={2}>
      <Card>
        <CardHeader
          title={<Link href={"/profile?id=" + applicant.id}>{applicant.name}</Link>}
        />
        <CardActions>
          <Button onClick={handleClick}>Accept</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
