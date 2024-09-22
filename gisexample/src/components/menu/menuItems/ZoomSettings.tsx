import React, {useEffect, useState} from 'react';

import HideMenuItem from './HideMenuItem';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import SpeedIcon from '@mui/icons-material/Speed';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import DownloadIcon from '@mui/icons-material/Download';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import FileLoader from './FileLoader'; 
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CustomSlider from '../Slider'; 
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

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
 } from '../../redux/actions'; 

import {      
    UpdateOpenCloseAction, 
    UpdateIsLineCompletedAction, 
    Point, 
    State, 
    UpdatePointsAction, 
    UpdatePositionAction
} from '../../redux/types'; 


const initialArrowNumb: number = 20;
const initialArrowWidth: number = 1.4;
const initialLineWidth: number = 0.7;
const initialCountourLineWidth: number = 1;
const initialAnimLenght: number = 2000;
const initialAnimSpeed: number = 20;


function ZoomSettings() {    
    
    const dispatch = useDispatch();
    const handleReturnZoom = () => {};

    return(
        <>
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
                menuItemText = {''}
                menuIcon={<><ZoomInMapIcon onClick={handleReturnZoom}/></>}
            >          
                <> 
                    <Button variant="outlined">Return start zoom</Button>
                </>
            </HideMenuItem>
        </>
    );
};

export default ZoomSettings;

