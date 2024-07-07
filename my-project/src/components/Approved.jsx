import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, List, ListItem, ListItemText, Grid } from '@mui/material';
import LeaveCard from './LeaveCard';

const Approved = ({ row }) => {
  return (
    <Box>
      <Typography variant="h6">Approved Leaves</Typography>
      <Grid container spacing={2}>
        {Array.isArray(row.Approved) && row.Approved.length > 0 ? (
          row.Approved.map((leave, index) => (
            <Grid item key={index}>
              <LeaveCard date={leave} color="#4CAF50" />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" style={{ marginTop: '1.25rem' }}>No other leaves</Typography>
        )}
      </Grid>
    </Box>
  );
};

Approved.propTypes = {
  row: PropTypes.object.isRequired,
};

export default Approved;
