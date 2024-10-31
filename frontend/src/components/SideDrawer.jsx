import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Avatar from '@mui/material/Avatar';

export default function SideDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <Avatar>
        JD
    </Avatar>

    <List>
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText>
                    Profile
                </ListItemText>
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <TaskAltIcon/>
                </ListItemIcon>
                <ListItemText>
                    Requests
                </ListItemText>
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <MessageIcon/>
                </ListItemIcon>
                <ListItemText>
                    Messages
                </ListItemText>
            </ListItemButton>
        </ListItem>
    </List>
    <Divider />
    <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <SettingsIcon/>
                </ListItemIcon>
                <ListItemText>
                    Settings
                </ListItemText>
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <ContactSupportIcon/>
                </ListItemIcon>
                <ListItemText>
                    Help
                </ListItemText>
            </ListItemButton>
        </ListItem>
    </Box>
  );

  return (
    <div>
      <React.Fragment key='right'>
        <Button onClick={toggleDrawer('right', true)}>bruh</Button>
        <Drawer
          anchor='right'
          open={state['right']}
          onClose={toggleDrawer('right', false)}
        >
          {list('right')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}