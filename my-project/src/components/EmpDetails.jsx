import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const EmpDetails = ({ row }) => {


  const countLeaves = (leaves) => {
    return leaves ? leaves.length : 0;
  };


  return (
    <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
      <Table sx={{ minWidth: 500 }} aria-label="employee details table">
        <TableBody>
          <TableRow>
            <TableCell variant="head" className="font-bold">Name</TableCell>
            <TableCell>{row.Name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" className="font-bold">Employee ID</TableCell>
            <TableCell>{row.EmpID}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" className="font-bold">Location</TableCell>
            <TableCell>{row.Location}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" className="font-bold">Level</TableCell>
            <TableCell>{row.Level}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" className="font-bold">Approved Leaves</TableCell>
            <TableCell>{countLeaves(row.Approved)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" className="font-bold">Planned Leaves</TableCell>
            <TableCell>{countLeaves(row.Planned)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" className="font-bold">Other Leaves</TableCell>
            <TableCell>{countLeaves(row.Other_Absence)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

EmpDetails.propTypes = {
  row: PropTypes.object.isRequired,
};

export default EmpDetails;
