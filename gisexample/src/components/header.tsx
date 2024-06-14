

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState, useEffect, FC } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/material/styles'; // Или import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles'; 

import SlidingPanel from '../../src/components/panel'
import styles from './panelStyles.module.scss';
import theme from './theme';

interface HeaderProps {
  className?: string; // Добавьте className
  classes?: any; // Добавьте className
  theme?: Theme;

}

// Компонент для шапки с кнопками меню
function Header(props: HeaderProps) {
  const classes = theme;


  return (
    <Box sx={{ flexGrow: 1 }}  className={styles.header}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            
            <SlidingPanel />
            
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            WGS84 to Lambert Conic 32
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};



export default Header;
