import React, {useEffect, useState} from 'react';
import './App.css';
import BasicSimpleTreeView from './components/menu/catalog';
import { createStyles, makeStyles } from '@mui/material/styles'; // Или import { createStyles } from '@mui/styles';
import { Theme, createTheme, ThemeProvider, useTheme} from '@mui/material/styles';
import theme from '../src/components/theme'; 
import CustomSlider from './components/menu/Slider'; // Импортируйте ваш компонент CustomSlider
import SVGDrag from './components/svgGraphics/TestZoomSvg';
import Graph from './components/svgGraphics/Graph';
import CustomAppBar from './components/menu/CustomAppBar';
import SvgCanvas from './components/svgGraphics/SvgCanvas'; 
import HideMenuItem from './components/menu/HideMenuItem';
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
import DownloadIcon from '@mui/icons-material/Download';
import pako from 'pako'; // Импорт pako
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import dataProps from './data/dataProps.json'; // Импортируйте ваш JSON файл
// import data from './data/data.json'; // Импортируйте ваш JSON файл
import FileLoader from './components/redux/FileLoader'; // Импортируйте ваш JSON файл
// import data from './data/data.json.gz'; // Импортируйте ваш JSON файл

import { useSelector, useDispatch } from 'react-redux';
import { UpdatePoints } from './components/redux/actions'; // Импорт action
import { Point, State, UpdatePointsAction } from './components/redux/types'; // Импорт action

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

    const [speedValue, setSpeedValue] = useState(initialAnimSpeed); 
    const updateSpeed = (value: number) => {
        setSpeedValue(value); 
    };

    const [lineWidthValue, setLineWidth] = useState(initialLineWidth); 
    const updateLineWidth = (value: number) => {
        setLineWidth(value); 
    };

    const [contourLineWidth, setContourLineWidth] = useState(initialCountourLineWidth); 
    const updateContourLineWidth = (value: number) => {
        setContourLineWidth(value); 
    };

    const [arrowWidthValue, setArrowWidth] = useState(initialArrowWidth); 
    const updateArrowWidth = (value: number) => {
      setArrowWidth(value); 
    };

    const [arrowNumb, setArrowNumb] = useState(initialArrowNumb); 
    const updatArrowNumb = (value: number) => {
      setArrowNumb(value); 
    };

    const [animLen, setAnimLen] = useState(initialAnimLenght); 
    const updatAnimLen = (value: number) => {
      setAnimLen(value); 
    };
    
    const [isActive, setIsActive] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const handlePlay = () => {
      setIsPlaying(true);
      setIsActive(false); 
    };
  
    const handlePause = () => {
      setIsPlaying(false);
      setIsActive(true); 
    };
  
    // TODO return zoom
    const handleReturnZoom = () => {}

    const data = useSelector((state: State) => state.points);



    //TODO что за open={true} ??!
    return (
        <div className="App" >
            <ThemeProvider theme={darkTheme}>
                <CustomAppBar
                    hideMenuChildren={
                        <div className="scrollbar my-style">
                            <div className="force-overflow">

                                <HideMenuItem 
                                    menuItemText = {'Rotating speed'} 
                                    menuIcon={<><SpeedIcon /></>}
                                >  
                                    {/* TODO calculate max value from data config */}
                                    <CustomSlider onChange={updateSpeed} max={260} min={0} defaultValue={initialAnimSpeed} step={0.1}/>       
                                </HideMenuItem>



                                <HideMenuItem 
                                    menuItemText = {'Line width'}
                                    menuIcon={<><WidthNormalIcon /></>}
                                >         
                                    <CustomSlider onChange={updateContourLineWidth} max={2} min={0} defaultValue={initialCountourLineWidth} step={0.0001}/>       
                                </HideMenuItem>

                                {/* <HideMenuItem 
                                    menuItemText = {'Arrow line width'}
                                    menuIcon={<><WidthNormalIcon /></>}
                                >         
                                    <CustomSlider onChange={updateLineWidth} max={10} min={0} defaultValue={0.25} step={0.001}/>       
     
                                </HideMenuItem> */}

                                <HideMenuItem 
                                    menuItemText = {'Arrow width'}
                                    menuIcon={<><EastOutlinedIcon /></>}
                                >       
                                    <CustomSlider onChange={updateArrowWidth} max={2} min={0} defaultValue={initialArrowWidth} step={0.0001}/>       
                                </HideMenuItem>

                                <HideMenuItem 
                                    menuItemText = {'Arrow number'}
                                    menuIcon={<><CallSplitIcon /></>}
                                >          
                                    <CustomSlider onChange={updatArrowNumb} max={data ? data[0].length - 1 : 250} min={1} defaultValue={initialArrowNumb}/>       
                                    <></>
                                </HideMenuItem>
                                
                                <HideMenuItem 
                                    menuItemText = {'Animation len'}
                                    menuIcon={<><AccessTimeIcon /></>}
                                >          
                                    <CustomSlider onChange={updatAnimLen} max={data ? data.length : 2500} min={0} isActive={isActive} defaultValue={initialAnimLenght}/>       
                                </HideMenuItem>
                                
                                <HideMenuItem 
                                    menuItemText = {''}
                                    menuIcon={<><PlayCircleIcon /></>}
                                >          
                                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                                        <Button onClick={handlePlay}>Play</Button>
                                        <Button onClick={handlePause}>Pause</Button>
                                    </ButtonGroup>
                                </HideMenuItem>
                                
                                <HideMenuItem 
                                    menuItemText = {''}
                                    menuIcon={<><ZoomInMapIcon onClick={handleReturnZoom}/></>}
                                >          
                                    <> 
                                        <Button variant="outlined">Return start zoom</Button>
                                    </>
                                </HideMenuItem>
                           
                                <HideMenuItem 
                                    menuItemText = {''}
                                    menuIcon={<><DownloadIcon /></>}
                                >          
                                    <FileLoader />
                                </HideMenuItem>
                                

                                {/* <div>{data1 ? <div>{data1[0]}'jhgjhg'</div> : 'raaaaarh'}</div> */}

                            </div>

                        </div>
                    }
                >
                    {/* <SVGDrag viewBox={viewBox}>
                        <></>
                    </SVGDrag>  */}

                    {/* <SvgCanvas viewBox={viewBox}> */}
                    <SvgCanvas>
                        <></>
                        <Graph 
                            // data={data}
                            animLen={animLen}
                            isPlaying={isPlaying}
                            arrowWidth={arrowWidthValue} // Установите ширину наконечника на 15
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
