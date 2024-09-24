
import React, {useEffect, useState} from 'react';
import HideMenuItem from '../HideMenuItem';
import WidthNormalIcon from '@mui/icons-material/WidthNormal';
import CustomSlider from '../Slider'; 
import { useSelector, useDispatch } from 'react-redux';

import { UpdateContourLineWidth } from '../../redux/actions'; 

const initialCountourLineWidth: number = 1;

function ContourLineWidth() {    
    
    const dispatch = useDispatch();
    const [contourLineWidth, setContourLineWidth] = useState(initialCountourLineWidth); 
    const handleContourLineWidth = (value: number) => {
        setContourLineWidth(value); 
        dispatch(UpdateContourLineWidth(contourLineWidth));
    };

    return(
        <HideMenuItem 
            menuItemText = {'Line width'}
            menuIcon={<><WidthNormalIcon /></>}
        >         
            <CustomSlider onChange={handleContourLineWidth} max={2} min={0} defaultValue={initialCountourLineWidth} step={0.0001}/>       
        </HideMenuItem>
    );
};

export default ContourLineWidth;
