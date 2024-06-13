
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import React, { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MenuIcon from '@mui/icons-material/Menu';


interface SlidingPanelProps {
  className?: string; // Добавьте className
}


// Компонент для шапки с кнопками меню
function SlidingPanel(props: SlidingPanelProps) {

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };
  
    const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {['lambert', 'wgs84'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>

                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
     
      </Box>
    );
  
    return (
      <div>
        
        <MenuIcon onClick={toggleDrawer(true)}>

        </MenuIcon>
        {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
        
        
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    );
  }

export default SlidingPanel;



