
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

import styles from './panelStyles.module.scss';
import { makeStyles } from '@mui/material/styles';
import theme from './theme';  

import { Theme, createTheme, ThemeProvider, useTheme} from '@mui/material/styles';


interface SlidingPanelProps {
  className?: string; // Добавьте className
  theme?: Theme;
}

// const useStyles = makeStyles((theme) => ({
//   // Дополнительные стили для SlidingPanel (если нужно)
//   slidingPanel: {
//     // ... 
//   },
//   // Используйте zIndex из темы для Drawer внутри SlidingPanel
//   drawer: {
//     zIndex: theme.zIndex.drawer, 
//   },
// }));


// Компонент для шапки с кнопками меню
function SlidingPanel(props: SlidingPanelProps) {





    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };
  
    const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" >
        <List>
          {['lambert', 'lambert', 'wgs84'].map((text, index) => (
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
        
        <MenuIcon onClick={toggleDrawer(open == true ? (false) : (true))}>

        </MenuIcon>
        {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
        
        
        <Drawer className={styles.drawer} open={open} >
          {DrawerList}
        </Drawer>
      </div>
    );
  }

export default SlidingPanel;



