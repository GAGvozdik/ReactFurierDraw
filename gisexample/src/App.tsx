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
import data from './data/data.json'; // Импортируйте ваш JSON файл


function App() {

    const [isTree, setIsTree] = useState(true); 
    const theme = useTheme();

    const [speedValue, setSpeedValue] = useState(1); // Состояние для значения слайдера

    const updateSpeed = (value: number) => {
        setSpeedValue(value); // Обновляем состояние при изменении значения слайдера
    };

    const [lineWidthValue, setLineWidth] = useState(3); // Состояние для значения слайдера

    const updateLineWidth = (value: number) => {
        setLineWidth(value); // Обновляем состояние при изменении значения слайдера
    };


    const [arrowEndWidthValue, setArrowEndWidth] = useState(10); // Состояние для значения слайдера

    const updatArrowEndWidth = (value: number) => {
      setArrowEndWidth(value); // Обновляем состояние при изменении значения слайдера
    };

    const [arrowNumb, setArrowNumb] = useState(8); // Состояние для значения слайдера

    const updatArrowNumb = (value: number) => {
      setArrowNumb(value); // Обновляем состояние при изменении значения слайдера
    };
    

    let points: number[][] = [];
    let startArrowNumb: number = arrowNumb;
    if (arrowNumb > data[0].length - 1){
      startArrowNumb = data[0].length - 1;
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



    return (
        <div className="App" >
            <ThemeProvider theme={theme}>
                <CustomAppBar

                    hideMenuChildren={
                        <HidingMenu open={true}>
                            <> 
                              <HideMenuItem open={true} menuItemText = {'Rotating speed'}>           
                                  <CustomSlider onChange={updateSpeed} />       
                              </HideMenuItem>

                              <HideMenuItem open={true} menuItemText = {'Arrow line width'}>           
                                  <CustomSlider onChange={updateLineWidth} />       
                              </HideMenuItem>

                              <HideMenuItem open={true} menuItemText = {'Arrow triangle width'}>           
                                  <CustomSlider onChange={updatArrowEndWidth} />       
                              </HideMenuItem>

                              <HideMenuItem open={true} menuItemText = {'Arrow number'}>           
                                  <CustomSlider onChange={updatArrowNumb} />       
                              </HideMenuItem>

                            </>
                        </HidingMenu> 
                    }
                >

                    <SvgCanvas viewBox={viewBox}>
                        <Graph 
                            arrowEndWidth={arrowEndWidthValue} // Установите ширину наконечника на 15
                            lineWidth={lineWidthValue}      // Установите ширину линии на 5
                            updateSpeed={speedValue}  // Установите скорость обновления на 500 мс
                            arrowNumb={arrowNumb}
                            
                        />
                    </SvgCanvas>

                </CustomAppBar>
            </ThemeProvider>
        </div>
    );
}

export default App;

