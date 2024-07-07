import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, IconButton, Button, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import StorageIcon from '@mui/icons-material/Storage';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';
import BusinessIcon from '@mui/icons-material/Business';

const getIconForIndex = (index) => {
  switch(index) {
    case 0:
      return <AdminPanelSettingsIcon />;
    case 1:
      return <PermIdentityIcon />;
    case 2:
      return <StorageIcon />;
    case 3:
      return <SearchIcon />;
    default:
      return null;
  }
};

const getIconForIndex2 = (index) => {
  switch(index) {
    case 0:
      return <HelpOutlineIcon />;
    case 1:
      return <InfoIcon />;
    case 2:
      return <BusinessIcon />;
    default:
      return null;
  }
};

const Navbar = ({ company_name }) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Admin', 'Employee', 'Details', 'Search'].map((text, index) => (
          <ListItem key={text}>
            <ListItemButton>
              <ListItemIcon>
                {getIconForIndex(index)}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Help', 'About Us', 'Accenture'].map((text, index) => (
          <ListItem key={text}>
            <ListItemButton>
              <ListItemIcon>
                {getIconForIndex2(index)}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="secondary" position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {company_name}
            </Typography>
            <Button color="inherit" component={Link} to="/stats">Employee Stats</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Navbar;
