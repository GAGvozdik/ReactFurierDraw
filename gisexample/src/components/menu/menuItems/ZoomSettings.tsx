import React, {useEffect, useState} from 'react';
import HideMenuItem from '../HideMenuItem';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import {UpdateDefaultZoom} from '../../redux/actions'; 
import {UpdateZoomType} from '../../redux/actions'; 
import {UpdateOpenCloseAction} from '../../redux/types'; 
import {State} from '../../redux/types';


const initialArrowNumb: number = 20;
const initialArrowWidth: number = 1.4;
const initialLineWidth: number = 0.7;
const initialCountourLineWidth: number = 1;
const initialAnimLenght: number = 2000;
const initialAnimSpeed: number = 20;


function ZoomSettings() {    
    
    const dispatch = useDispatch();

    const [defaultZoom, setDefaultZoom] = useState(true);

    const handleReturnZoom = () => {
        dispatch(UpdateDefaultZoom(!defaultZoom)); 
        setDefaultZoom(!defaultZoom);

    };

    const handleZoomType = (event: React.ChangeEvent<HTMLInputElement>) => {
        const zoomToCenter = event.target.value === "Zoom to center"; 
        const zoomToMouse = event.target.value === "Zoom to mouse"; 
        const zoomToLastArrow = event.target.value === "Zoom to last arrow"; 

        dispatch(UpdateZoomType("Zoom to center"));

    };


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
                        onChange={handleZoomType}
                    >
                        <FormControlLabel value="Zoom to center" control={<Radio />} label="Zoom to center" />
                        <FormControlLabel value="Zoom to mouse" control={<Radio />} label="Zoom to mouse" />
                        <FormControlLabel value="Zoom to last arrow" control={<Radio />} label="Zoom to last arrow" />
                    </RadioGroup>
                </FormControl>
                
            </HideMenuItem>
                                        
            <HideMenuItem 
                menuItemText = {''}
                menuIcon={<><ZoomInMapIcon/></>}
            >          
                <> 
                    <Button onClick={handleReturnZoom} variant="outlined">Return start zoom</Button>
                </>
            </HideMenuItem>
        </>
    );
};

export default ZoomSettings;

