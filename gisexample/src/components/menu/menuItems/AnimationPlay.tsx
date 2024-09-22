
import React, {useEffect, useState} from 'react';
import HideMenuItem from './HideMenuItem';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CustomSlider from '../Slider'; 
import { useSelector, useDispatch } from 'react-redux';
import {UpdateIsPlaying, UpdateAnimLen} from '../../redux/actions'; 
import {State} from '../../redux/types'; 
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const initialAnimLenght: number = 2000;

function AnimationPlay() {    
    
    const dispatch = useDispatch();

    const data = useSelector((state: State) => state.points);

    const [isAnimLenActive, setIsActive] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [animLen, setAnimLen] = useState(initialAnimLenght); 

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
    
    const handleAnimLen = (value: number) => {
      setAnimLen(value); 
      dispatch(UpdateAnimLen(animLen));
    };

    return(
        <>
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
        </>

    );
};

export default AnimationPlay;
