import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable'; // Icon for Planned Leaves

const LeaveCard = ({ date, color }) => {
  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <EventAvailableIcon style={{ fontSize: 40, color: color }} />
          </Grid>
          <Grid item>
            <Typography color="textSecondary">
              {date}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LeaveCard;
