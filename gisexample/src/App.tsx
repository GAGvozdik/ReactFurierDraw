import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from '../src/components/header'
import { useTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/material/styles'; // Или import { createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles'; 


import './App.css';


function App() {


  return (
    <div className="App">
      <Header  /> 
    </div>
  );
}

export default App;
