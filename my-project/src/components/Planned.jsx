import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, List, ListItem, ListItemText, Grid } from '@mui/material';
import LeaveCard from './LeaveCard';

const Planned = ({ row }) => {
  return (
    <Box>
      <Typography variant="h6">Planned Leaves</Typography>
      <Grid container spacing={2}>
        {Array.isArray(row.Planned) && row.Planned.length > 0 ? (
          row.Planned.map((leave, index) => (
            <Grid item key={index}>
              <LeaveCard date={leave} color="#2196F3" />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" style={{ marginTop: '1.25rem' }}>No other leaves</Typography>
        )}
      </Grid>
    </Box>
  );
};

Planned.propTypes = {
  row: PropTypes.object.isRequired,
};

export default Planned;
