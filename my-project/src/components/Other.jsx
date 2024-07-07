import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, List, ListItem, ListItemText, Grid } from '@mui/material';
import LeaveCard from './LeaveCard';

const Other = ({ row }) => {
  return (
    <Box>
      <Typography variant="h6">Other Leaves</Typography>
      <Grid container spacing={2}>
        {Array.isArray(row.Other_Absence) && row.Other_Absence.length > 0 ? (
          row.Other_Absence.map((leave, index) => (
            <Grid item key={index}>
              <LeaveCard date={leave} color="#FFC107" />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" style={{ marginTop: '1.25rem' }}>No other leaves</Typography>

        )}
      </Grid>
    </Box>
  );
};

Other.propTypes = {
  row: PropTypes.object.isRequired,
};

export default Other;
