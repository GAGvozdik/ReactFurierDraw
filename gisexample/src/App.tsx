import React, {useEffect, useState} from 'react';
import './App.css';
import BasicSimpleTreeView from '../src/components/catalog';
import { createStyles, makeStyles } from '@mui/material/styles'; // Или import { createStyles } from '@mui/styles';
import { Theme, createTheme, ThemeProvider, useTheme} from '@mui/material/styles';
import theme from '../src/components/theme'; 
import CustomSlider from './components/Slider'; // Импортируйте ваш компонент CustomSlider

import SVGDrag from './components/TestZoomSvg';
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
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import dataProps from './data/dataProps.json'; // Импортируйте ваш JSON файл
import data from './data/data.json'; // Импортируйте ваш JSON файл
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
 
  

    // const [data, setData] = useState<number[][][] | undefined>(undefined);

    // useEffect(() => {
    // //   fetch('../public/data.json')
    //   fetch('/data.json')
    //     .then((response) => response.json())
    //     .then((d) => setData(d))
    //     .catch((error) => console.error('Ошибка при загрузке данных:', error));
    // }, []);
  

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

    let points = [];


    let viewBox: string = '190 210 200 200';

    if (data != undefined){
        points = data.map(innerArray => innerArray[arrowNumb]);


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
        viewBox = `${minX - padding} ${minY - padding} ${viewWidth} ${viewHeight}`;
    }    


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
                                    {/* TODO calculate max value from data config */}
                                    <CustomSlider onChange={updateSpeed} max={260} min={0} defaultValue={initialAnimSpeed} step={0.1}/>       
                                </HideMenuItem>



                                <HideMenuItem 
                                    menuItemText = {'Line width'}
                                    open={true} 
                                    menuIcon={<><WidthNormalIcon /></>}
                                >         
                                    <CustomSlider onChange={updateContourLineWidth} max={2} min={0} defaultValue={initialCountourLineWidth} step={0.0001}/>       
                                </HideMenuItem>

                                {/* <HideMenuItem 
                                    menuItemText = {'Arrow line width'}
                                    open={true} 
                                    menuIcon={<><WidthNormalIcon /></>}
                                >         
                                    <CustomSlider onChange={updateLineWidth} max={10} min={0} defaultValue={0.25} step={0.001}/>       
     
                                </HideMenuItem> */}

                                <HideMenuItem 
                                    menuItemText = {'Arrow width'}
                                    open={true} 
                                    menuIcon={<><EastOutlinedIcon /></>}
                                >       
                                    <CustomSlider onChange={updateArrowWidth} max={2} min={0} defaultValue={initialArrowWidth} step={0.0001}/>       
                                </HideMenuItem>

                                <HideMenuItem 
                                    menuItemText = {'Arrow number'}
                                    open={true} 
                                    menuIcon={<><CallSplitIcon /></>}
                                >          
                                    <CustomSlider onChange={updatArrowNumb} max={data ? data[0].length - 1 : 250} min={1} defaultValue={initialArrowNumb}/>       
                                    <></>
                                </HideMenuItem>
                                
                                <HideMenuItem 
                                    menuItemText = {'Animation len'}
                                    open={true} 
                                    menuIcon={<><AccessTimeIcon /></>}
                                >          
                                    <CustomSlider onChange={updatAnimLen} max={data ? data.length : 2500} min={0} isActive={isActive} defaultValue={initialAnimLenght}/>       
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
                                {/* {g} */}

                                {/* <div>{data1 ? <div>{data1[0]}'jhgjhg'</div> : 'raaaaarh'}</div> */}

                            </>
                        </HidingMenu> 
                    }
                >
                    {/* <SVGDrag viewBox={viewBox}>
                        <></>
                    </SVGDrag>  */}

                    <SvgCanvas viewBox={viewBox}>
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
