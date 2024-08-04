import React, {useEffect, useState} from 'react';
import './App.css';
import BasicSimpleTreeView from '../src/components/catalog';
import { createStyles, makeStyles } from '@mui/material/styles'; // Или import { createStyles } from '@mui/styles';
import { Theme, createTheme, ThemeProvider, useTheme} from '@mui/material/styles';
import theme from '../src/components/theme'; 

import Graph from './components/Graph';
import CustomAppBar from './components/CustomAppBar';
import SvgCanvas from './components/SvgCanvas';

function App() {

  const [isTree, setIsTree] = useState(true); 
  const theme = useTheme();

  return (
    <div className="App" >
      <ThemeProvider theme={theme}>
        <CustomAppBar>
          <SvgCanvas>
            <Graph></Graph>
          </SvgCanvas>
          

        </CustomAppBar>
      </ThemeProvider>
    </div>
  );
}

export default App;






