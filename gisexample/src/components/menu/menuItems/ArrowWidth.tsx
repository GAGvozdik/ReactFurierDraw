import React, {useEffect, useState} from 'react';
import HideMenuItem from '../HideMenuItem';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import CustomSlider from '../Slider'; 
import { useSelector, useDispatch } from 'react-redux';
import {UpdateArrowWidth} from '../../redux/actions';
const initialArrowWidth: number = 1.4;

function ArrowWidth() {    
    
    const dispatch = useDispatch();

    const [arrowWidth, setArrowWidth] = useState(initialArrowWidth); 
    const handleArrowWidth = (value: number) => {
      setArrowWidth(value); 
      dispatch(UpdateArrowWidth(arrowWidth));
    };

    return(
        <HideMenuItem 
            menuItemText = {'Arrow width'}
            menuIcon={<><EastOutlinedIcon /></>}
        >       
            <CustomSlider onChange={handleArrowWidth} max={2} min={0} defaultValue={initialArrowWidth} step={0.0001}/>       
        </HideMenuItem>
    );
};

export default ArrowWidth;