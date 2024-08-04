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


function App() {

    const [isTree, setIsTree] = useState(true); 
    const theme = useTheme();

    const [sliderValue, setSliderValue] = useState(1); // Состояние для значения слайдера

    const handleSliderChange = (value: number) => {
        setSliderValue(value); // Обновляем состояние при изменении значения слайдера
    };

    return (
        <div className="App" >
            <ThemeProvider theme={theme}>
                <CustomAppBar

                    hideMenuChildren={
                        <HidingMenu open={true}>
                            <> 
                              <HideMenuItem 
                                  open={true}
                                  menuItemText = {''}
                              >
                                  <>
                                      <CustomSlider onChange={handleSliderChange} />       
                                  </>           
                              </HideMenuItem>

                              <HideMenuItem 
                                  open={true}
                                  menuItemText = {'My text'}
                              >
                                  <></>           
                              </HideMenuItem>


                            </>
                        </HidingMenu> 
                    }

                >

                    <SvgCanvas>
                        <Graph 
                            arrowEndWidth={15} // Установите ширину наконечника на 15
                            lineWidth={5}      // Установите ширину линии на 5
                            updateSpeed={sliderValue}  // Установите скорость обновления на 500 мс
                        />
                    </SvgCanvas>

                </CustomAppBar>
            </ThemeProvider>
        </div>
    );
}

export default App;




