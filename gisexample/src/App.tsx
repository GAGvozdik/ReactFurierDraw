import React, {useEffect, useState} from 'react';
import './App.css';
import BasicSimpleTreeView from './components/menu/catalog';
import { createStyles, makeStyles } from '@mui/material/styles'; // Или import { createStyles } from '@mui/styles';
import { Theme, createTheme, ThemeProvider, useTheme} from '@mui/material/styles';
import theme from '../src/components/theme'; 
import CustomSlider from './components/menu/Slider'; // Импортируйте ваш компонент CustomSlider
import Graph from './components/svgGraphics/Graph';
import CustomAppBar from './components/menu/CustomAppBar';
import SvgCanvas from './components/svgGraphics/SvgCanvas'; 
import HideMenuItems from './components/menu/menuItems/HideMenuItems'; 

// import data from './data/data.json.gz'; // Импортируйте ваш JSON файл

import { useSelector, useDispatch } from 'react-redux';
import { UpdatePoints, UpdatePosition, UpdateIsLineCompleted } from './components/redux/actions'; // Импорт action
import {      
    UpdateOpenCloseAction, 
    UpdateIsLineCompletedAction, 
    Point, 
    State, 
    UpdatePointsAction, 
    UpdatePositionAction} from './components/redux/types'; // Импорт action



import CssBaseline from '@mui/material/CssBaseline';

const initialArrowNumb: number = 20;
const initialArrowWidth: number = 1.4;
const initialLineWidth: number = 0.7;
const initialCountourLineWidth: number = 1;
const initialAnimLenght: number = 2000;
const initialAnimSpeed: number = 20;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

    const g = useSelector((state: State) => state.points);

    const [isTree, setIsTree] = useState(true); 
    const theme = useTheme();

    const [zoomReturn, setZoomReturn] = useState<boolean>(false);

    // TODO fix return zoom
    const handleReturnZoom = () => {
        setZoomReturn(true); 
    }

    return (
        <div className="App" >
            <ThemeProvider theme={darkTheme}>
                <CustomAppBar hideMenuChildren={ <HideMenuItems /> }>
                    <SvgCanvas >
                        <Graph />
                    </SvgCanvas>
                </CustomAppBar>
            </ThemeProvider>
        </div>
    );
}

export default App;
