import React from 'react';
import { AppBar, Card, CardContent, Avatar, Container, Box, Button, Toolbar, Typography } from '@mui/material';
import EmpDetails from './EmpDetails';
import Approved from './Approved';
import Planned from './Planned';
import Other from './Other';
import ColoredCalendar from './Calendar';

const EmployeePage = ({ row, onBack }) => {
  const [currentComponent, setCurrentComponent] = React.useState('EmpDetails');

  const dates = {
    approved: Array.isArray(row.Approved) ? row.Approved : [],
    planned: Array.isArray(row.Planned) ? row.Planned : [],
    pending: Array.isArray(row.Other_Absence) ? row.Other_Absence : [],
  };

  const handleButtonClick = (component) => {
    setCurrentComponent(component);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 'EmpDetails':
        return <EmpDetails row={row} />;
      case 'Approved':
        return <Approved row={row} />;
      case 'Planned':
        return <Planned row={row} />;
      case 'Other':
        return <Other row={row} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      {/* Employee Card */}
      <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, marginBottom: 2 }}>
        <Avatar
          src={row && row.imageUrl ? row.imageUrl : 'https://via.placeholder.com/100'}
          alt="Employee Image"
          sx={{ width: 100, height: 100, marginRight: 2 }}
        />
        <CardContent>
          <Typography variant="h5">{row && row.Name}</Typography>
          <Typography variant="subtitle1">Employee ID: {row && row.EmpID}</Typography>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <ColoredCalendar dates={dates} />
      </Box>

      <AppBar position="static" sx={{ backgroundColor: '#6A1B9A', marginBottom: 2 }}>
        <Toolbar className="flex justify-center">
          <Button
            variant="contained"
            onClick={() => handleButtonClick('EmpDetails')}
            sx={{ backgroundColor: '#9C27B0', marginRight: 1 }}
            className="flex-1"
          >
            Employee Details
          </Button>
          <Button
            variant="contained"
            onClick={() => handleButtonClick('Approved')}
            sx={{ backgroundColor: '#9C27B0', marginRight: 1 }}
            className="flex-1"
          >
            Approved Leaves
          </Button>
          <Button
            variant="contained"
            onClick={() => handleButtonClick('Planned')}
            sx={{ backgroundColor: '#9C27B0', marginRight: 1 }}
            className="flex-1"
          >
            Planned Leaves
          </Button>
          <Button
            variant="contained"
            onClick={() => handleButtonClick('Other')}
            sx={{ backgroundColor: '#9C27B0' }}
            className="flex-1"
          >
            Other Leaves
          </Button>
        </Toolbar>
      </AppBar>

      {/* Content */}
      {renderComponent()}

      {/* Back Button */}
      <Button variant="contained" color="primary" onClick={onBack} sx={{ marginTop: 4 }}>
        Back to Table
      </Button>
    </Container>
  );
};

export default EmployeePage;
