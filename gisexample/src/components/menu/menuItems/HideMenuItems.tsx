import React, {useEffect, useState} from 'react';

import HideMenuItem from './HideMenuItem';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SpeedIcon from '@mui/icons-material/Speed';
import WidthNormalIcon from '@mui/icons-material/WidthNormal';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DownloadIcon from '@mui/icons-material/Download';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import FileLoader from '../../redux/FileLoader'; // Импортируйте ваш JSON файл
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CustomSlider from '../Slider'; // Импортируйте ваш компонент CustomSlider

import { useSelector, useDispatch } from 'react-redux';

import { 
    UpdatePoints, 
    UpdatePosition, 
    UpdateIsLineCompleted,
    UpdateArrowWidth,
    UpdateLineWidth,
    UpdateSpeed,
    UpdateArrowNumb,
    UpdateAnimLen,
    UpdateContourLineWidth,
    UpdateIsPlaying
 } from '../../redux/actions'; // Импорт action

import {      
    UpdateOpenCloseAction, 
    UpdateIsLineCompletedAction, 
    Point, 
    State, 
    UpdatePointsAction, 
    UpdatePositionAction
} from '../../redux/types'; // Импорт action



const initialArrowNumb: number = 20;
const initialArrowWidth: number = 1.4;
const initialLineWidth: number = 0.7;
const initialCountourLineWidth: number = 1;
const initialAnimLenght: number = 2000;
const initialAnimSpeed: number = 20;


function HideMenuItems() {


    // TODO Update => update
    // TODO code style
    // TODO divide into few components
    // TODO fix interface
    // TODO define initial values by file
    // TODO play pause works incorrect !!!!!!!!!!!!!!!!!!
    // TODO zoom in last arrow
    // TODO fix zoom
    // TODO add points photo digitizer
    // TODO move zoom return to hiding menu
    // TODO fix hiding menu icons
    // TODO divide hiding menu interface to style, anim options
    // TODO add colorizer
    // TODO add photo loader
    // TODO add slider range changer with file limits
    // TODO add second hiding panel
    // TODO add mobile version using react native
    // TODO add svg to giff converter & loader
    // TODO make custom icons
    // TODO make sprites
    // TODO make light theme
    // TODO add zoom to cursor
    // TODO 
    // TODO 
    // TODO 
    // TODO 

    const data = useSelector((state: State) => state.points);

    const dispatch = useDispatch();

    const handleIsLineComleted = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isLineCompleted = event.target.value === "Complete line"; 
        dispatch(UpdateIsLineCompleted(isLineCompleted)); 
    };

    const [arrowWidth, setArrowWidth] = useState(initialArrowWidth); 
    const handleArrowWidth = (value: number) => {
      setArrowWidth(value); 
      dispatch(UpdateArrowWidth(arrowWidth));
    };

    const [lineWidthValue, setLineWidth] = useState(initialLineWidth); 
    const handleLineWidth = (value: number) => {
        setLineWidth(value); 
        dispatch(UpdateLineWidth(lineWidthValue));
    };

    const [speedValue, setSpeedValue] = useState(initialAnimSpeed); 
    const handleSpeed = (value: number) => {
        setSpeedValue(value); 
        dispatch(UpdateSpeed(speedValue));
    };

    const [arrowNumb, setArrowNumb] = useState(initialArrowNumb); 
    const handleArrowNumb = (value: number) => {
      setArrowNumb(value); 
      dispatch(UpdateArrowNumb(arrowNumb));
    };

    const [animLen, setAnimLen] = useState(initialAnimLenght); 
    const handleAnimLen = (value: number) => {
      setAnimLen(value); 
      dispatch(UpdateAnimLen(animLen));
    };

    const [contourLineWidth, setContourLineWidth] = useState(initialCountourLineWidth); 
    const handleContourLineWidth = (value: number) => {
        setContourLineWidth(value); 
        dispatch(UpdateContourLineWidth(contourLineWidth));
    };

    const [isAnimLenActive, setIsActive] = useState(true);

    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
      setIsPlaying(true);
      setIsActive(false); 
      dispatch(UpdateIsPlaying(isPlaying));
    };
  
    const handlePause = () => {
      setIsPlaying(false);
      setIsActive(true); 
      dispatch(UpdateIsPlaying(isPlaying));
    };
  
    return(
        <div className="scrollbar my-style">
            <div className="force-overflow">

                <HideMenuItem 
                    menuItemText = {'Rotating speed'} 
                    menuIcon={<><SpeedIcon /></>}
                >  
                    {/* TODO calculate max value from data config */}
                    <CustomSlider onChange={handleSpeed} max={260} min={0} defaultValue={initialAnimSpeed} step={0.1}/>       
                </HideMenuItem>



                <HideMenuItem 
                    menuItemText = {'Line width'}
                    menuIcon={<><WidthNormalIcon /></>}
                >         
                    <CustomSlider onChange={handleContourLineWidth} max={2} min={0} defaultValue={initialCountourLineWidth} step={0.0001}/>       
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
                    <CustomSlider onChange={handleArrowWidth} max={2} min={0} defaultValue={initialArrowWidth} step={0.0001}/>       
                </HideMenuItem>

                <HideMenuItem 
                    menuItemText = {'Arrow number'}
                    menuIcon={<><CallSplitIcon /></>}
                >          
                    <CustomSlider onChange={handleArrowNumb} max={data ? data[0].length - 1 : 250} min={1} defaultValue={initialArrowNumb}/>       
                    <></>
                </HideMenuItem>
                
                <HideMenuItem 
                    menuItemText = {'Animation len'}
                    menuIcon={<><AccessTimeIcon /></>}
                >          
                    <CustomSlider onChange={handleAnimLen} max={data ? data.length : 2500} min={0} isActive={isAnimLenActive} defaultValue={initialAnimLenght}/>       
                </HideMenuItem>
                
                <HideMenuItem 
                    menuItemText = {'Play animation'}
                    menuIcon={<><PlayCircleIcon /></>}
                >          
                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                        <Button onClick={handlePlay}>Play</Button>
                        <Button onClick={handlePause}>Pause</Button>
                    </ButtonGroup>
                </HideMenuItem>

                <HideMenuItem 
                    menuItemText = {'Zoom settings'}
                    menuIcon={<><CenterFocusStrongIcon /></>}
                >          
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Zoom to center"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="Zoom to center" control={<Radio />} label="Zoom to center" />
                            <FormControlLabel value="Zoom to mouse" control={<Radio />} label="Zoom to mouse" />
                            <FormControlLabel value="Zoom to last arrow" control={<Radio />} label="Zoom to last arrow" />
                        </RadioGroup>
                    </FormControl>
                    {/* <Button variant="outlined">Return default position</Button> */}

                </HideMenuItem>

                <HideMenuItem 
                    menuItemText = {'Is line completed?'}
                    menuIcon={<><CenterFocusStrongIcon /></>}
                >          
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Complete line"
                            name="radio-buttons-group"
                            onChange={handleIsLineComleted}
                        >
                            <FormControlLabel value="Complete line" control={<Radio />} label="Complete line" />
                            <FormControlLabel value="Line drawing" control={<Radio />} label="Line drawing" />

                        </RadioGroup>
                    </FormControl>
                    {/* <Button variant="outlined">Return default position</Button> */}

                </HideMenuItem>

                {/*                                 
                <HideMenuItem 
                    menuItemText = {''}
                    menuIcon={<><ZoomInMapIcon onClick={handleReturnZoom}/></>}
                >          
                    <> 
                        <Button variant="outlined">Return start zoom</Button>
                    </>
                </HideMenuItem> */}
        
                <HideMenuItem 
                    menuItemText = {''}
                    menuIcon={<><DownloadIcon /></>}
                >          
                    <FileLoader />
                </HideMenuItem>
                

                {/* <div>{data1 ? <div>{data1[0]}'jhgjhg'</div> : 'raaaaarh'}</div> */}

            </div>

        </div>
    );
};

export default HideMenuItems;