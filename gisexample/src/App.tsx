import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from '../src/components/header'
import MainMap from '../src/components/map'
import { createStyles, makeStyles } from '@mui/material/styles'; // Или import { createStyles } from '@mui/styles';

import { Theme, createTheme, ThemeProvider, useTheme} from '@mui/material/styles';
import theme from '../src/components/theme'; 

import {  MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// import { Map } from 'react-leaflet';
import './App.css';


function App() {


  return (
    <div className="App">

      <ThemeProvider theme={theme}>
        
        <Header  theme={theme}/> 

        <MainMap theme={theme} />

      </ThemeProvider>
    </div>
  );
}

export default App;
