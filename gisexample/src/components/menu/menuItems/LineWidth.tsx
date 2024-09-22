import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {UpdateLineWidth} from '../../redux/actions'; 
import CustomSlider from '../Slider'; 
import WidthNormalIcon from '@mui/icons-material/WidthNormal';
import HideMenuItem from './HideMenuItem';

const initialLineWidth: number = 0.7;

// TODO make this feature
function LineWidth() {    
    
    const dispatch = useDispatch();

    const [lineWidth, setLineWidth] = useState(initialLineWidth); 
    const handleLineWidth = (value: number) => {
        setLineWidth(value); 
        dispatch(UpdateLineWidth(lineWidth));
    };

    return(
        <HideMenuItem 
            menuItemText = {'Arrow line width'}
            menuIcon={<><WidthNormalIcon /></>}
        >         
            <CustomSlider onChange={handleLineWidth} max={10} min={0} defaultValue={0.25} step={0.001}/>       

        </HideMenuItem>
    );
};

export default LineWidth;


