import React, {useEffect, useState} from 'react';

import HideMenuItem from '../HideMenuItem';
import SpeedIcon from '@mui/icons-material/Speed';
import CustomSlider from '../Slider'; 
import { useSelector, useDispatch } from 'react-redux';
import { UpdateSpeed } from '../../redux/actions'; 

const initialAnimSpeed: number = 20;

function AnimationSpeed() {    
    
    const dispatch = useDispatch();
    const [speedValue, setSpeedValue] = useState(initialAnimSpeed); 
    const handleSpeed = (value: number) => {
        setSpeedValue(value); 
        dispatch(UpdateSpeed(speedValue));
    };

    return(
        <HideMenuItem 
            menuItemText = {'Rotating speed'} 
            menuIcon={<><SpeedIcon /></>}
        >  
            {/* TODO calculate max value from data config */}
            <CustomSlider onChange={handleSpeed} max={260} min={0} defaultValue={initialAnimSpeed} step={0.1}/>       
        </HideMenuItem>
    );
};

export default AnimationSpeed;

