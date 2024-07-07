// src/RandomUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, CircularProgress, Box } from '@mui/material';

const RandomUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://randomuser.me/api/')
      .then(response => {
        setUser(response.data.results[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={user.picture.large}
          alt={`${user.name.first} ${user.name.last}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.name.title} {user.name.first} {user.name.last}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Phone: {user.phone}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location: {user.location.city}, {user.location.state}, {user.location.country}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RandomUser;
