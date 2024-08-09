import React, {useEffect, useState} from 'react';
import './App.css';
import BasicSimpleTreeView from '../src/components/catalog';
import { createStyles, makeStyles } from '@mui/material/styles'; // Или import { createStyles } from '@mui/styles';
import { Theme, createTheme, ThemeProvider, useTheme} from '@mui/material/styles';
import theme from '../src/components/theme'; 
import CustomSlider from './components/Slider'; // Импортируйте ваш компонент CustomSlider
import Graph from './components/Graph';
import CustomAppBar from './components/CustomAppBar';
import SvgCanvas from './components/SvgCanvas';
import HidingMenu from './components/HidingMenu';
import HideMenuItem from './components/HideMenuItem';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import SpeedIcon from '@mui/icons-material/Speed';
import WidthNormalIcon from '@mui/icons-material/WidthNormal';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import pako from 'pako'; // Импорт pako

import dataProps from './data/dataProps.json'; // Импортируйте ваш JSON файл
import data from './data/data.json'; // Импортируйте ваш JSON файл
// import data from './data/data.json.gz'; // Импортируйте ваш JSON файл

import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {
 
  

    const [isTree, setIsTree] = useState(true); 
    const theme = useTheme();

    const [speedValue, setSpeedValue] = useState(1); // Состояние для значения слайдера

    const updateSpeed = (value: number) => {
        setSpeedValue(value); // Обновляем состояние при изменении значения слайдера
    };

    const [lineWidthValue, setLineWidth] = useState(0.7); // Состояние для значения слайдера

    const updateLineWidth = (value: number) => {
        setLineWidth(value); // Обновляем состояние при изменении значения слайдера
    };

    const [contourLineWidth, setContourLineWidth] = useState(0.025); // Состояние для значения слайдера

    const updateContourLineWidth = (value: number) => {
        setContourLineWidth(value); // Обновляем состояние при изменении значения слайдера
    };


    const [arrowEndWidthValue, setArrowEndWidth] = useState(6); // Состояние для значения слайдера

    const updatArrowEndWidth = (value: number) => {
      setArrowEndWidth(value); // Обновляем состояние при изменении значения слайдера
    };

    const [arrowNumb, setArrowNumb] = useState(25); // Состояние для значения слайдера

    const updatArrowNumb = (value: number) => {
      setArrowNumb(value); // Обновляем состояние при изменении значения слайдера
    };
    

    const [animLen, setAnimLen] = useState(2000); // Состояние для значения слайдера

    const updatAnimLen = (value: number) => {
      setAnimLen(value); // Обновляем состояние при изменении значения слайдера
    };
    
    const [isActive, setIsActive] = useState(true);

    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
      setIsPlaying(true);
      setIsActive(false); // Обновляем состояние при изменении значения слайдера
    };
  
    const handlePause = () => {
      setIsPlaying(false);
      setIsActive(true); // Обновляем состояние при изменении значения слайдера
    };
  

    const handleReturnZoom = () => {}

    let points = [];
    let startArrowNumb = arrowNumb;

    if (arrowNumb > Number(dataProps[0]) - 1) {
        startArrowNumb = Number(dataProps[0]) - 1;
    }

    points = data.map(innerArray => innerArray[startArrowNumb]);

    // Находим минимальные и максимальные значения x и y
    const xValues = points.map(point => point[0]);
    const yValues = points.map(point => point[1]);

    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    // Задаем размеры viewBox
    const padding = 10; // Отступы для viewBox
    const viewWidth = maxX - minX + 2 * padding;
    const viewHeight = maxY - minY + 2 * padding;
    const viewBox = `${minX - padding} ${minY - padding} ${viewWidth} ${viewHeight}`;
    

    //TODO что за open={true} ??!
    return (
        <div className="App" >
            <ThemeProvider theme={darkTheme}>
                <CustomAppBar


                    
                    hideMenuChildren={
                        <HidingMenu open={true}>
                            <> 
                                <HideMenuItem 
                                    open={true} 
                                    menuItemText = {'Rotating speed'} 
                                    menuIcon={<><SpeedIcon /></>}
                                >  
                                    <CustomSlider onChange={updateSpeed} max={260} min={0} defaultValue={70} step={0.1}/>       
                                </HideMenuItem>


                                <HideMenuItem 
                                    menuItemText = {'Line width'}
                                    open={true} 
                                    menuIcon={<><WidthNormalIcon /></>}
                                >         
                                    <CustomSlider onChange={updateContourLineWidth} max={10} min={0} defaultValue={0.008} step={0.001}/>       
                                </HideMenuItem>

                                {/* <HideMenuItem 
                                    menuItemText = {'Arrow line width'}
                                    open={true} 
                                    menuIcon={<><WidthNormalIcon /></>}
                                >         
                                    <CustomSlider onChange={updateLineWidth} max={10} min={0} defaultValue={0.25} step={0.001}/>       
     
                                </HideMenuItem> */}

                                {/* <HideMenuItem 
                                    menuItemText = {'Arrow triangle width'}
                                    open={true} 
                                    menuIcon={<><ChangeHistoryIcon /></>}
                                >       
                                    <CustomSlider onChange={updatArrowEndWidth} max={30} min={0} defaultValue={8} step={0.001}/>       
                                </HideMenuItem> */}

                                <HideMenuItem 
                                    menuItemText = {'Arrow number'}
                                    open={true} 
                                    menuIcon={<><CallSplitIcon /></>}
                                >          
                                    <CustomSlider onChange={updatArrowNumb} max={600} min={1} defaultValue={8}/>       
                                    <></>
                                </HideMenuItem>
                                
                                <HideMenuItem 
                                    menuItemText = {'Animation len'}
                                    open={true} 
                                    menuIcon={<><AccessTimeIcon /></>}
                                >          
                                    <CustomSlider onChange={updatAnimLen} max={1500} min={0} isActive={isActive} defaultValue={1500}/>       
                                </HideMenuItem>
                                
                                <HideMenuItem 
                                    menuItemText = {''}
                                    open={true} 
                                    menuIcon={<><PlayCircleIcon /></>}
                                >          
                                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                                        <Button onClick={handlePlay}>Play</Button>
                                        <Button onClick={handlePause}>Pause</Button>
                                    </ButtonGroup>
                                </HideMenuItem>
                                
                                <HideMenuItem 
                                    menuItemText = {'Return start zoom'}
                                    open={true} 
                                    menuIcon={<><ZoomInMapIcon onClick={handleReturnZoom}/></>}
                                >          
                                    <></>
                                </HideMenuItem>

                            </>
                        </HidingMenu> 
                    }
                >

                    <SvgCanvas viewBox={viewBox}>
                        {/* <></> */}
                        <Graph 
                            data={data}
                            animLen={animLen}
                            isPlaying={isPlaying}
                            arrowEndWidth={arrowEndWidthValue} // Установите ширину наконечника на 15
                            isLogSize={true} 
                            lineWidth={lineWidthValue}      // Установите ширину линии на 5
                            updateSpeed={speedValue}  // Установите скорость обновления на 500 мс
                            arrowNumb={arrowNumb}
                            contourLineWidth={contourLineWidth}
                            
                        />
                    </SvgCanvas>

                </CustomAppBar>
            </ThemeProvider>
        </div>
    );
}

export default App;

