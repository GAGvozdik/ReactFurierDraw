
import React, {useEffect, useState} from 'react';

import HideMenuItem from './HideMenuItem';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import CustomSlider from '../Slider'; 
import { useSelector, useDispatch } from 'react-redux';
import {UpdateArrowNumb} from '../../redux/actions'; 
import {State} from '../../redux/types'; 


const initialArrowNumb: number = 20;

function ArrowNumber() {    
    
    const dispatch = useDispatch();

    const data = useSelector((state: State) => state.points);

    const [arrowNumb, setArrowNumb] = useState(initialArrowNumb); 
    const handleArrowNumb = (value: number) => {
      setArrowNumb(value); 
      dispatch(UpdateArrowNumb(arrowNumb));
    };

    return(
        <HideMenuItem 
            menuItemText = {'Arrow number'}
            menuIcon={<><CallSplitIcon /></>}
        >          
            <CustomSlider onChange={handleArrowNumb} max={data ? data[0].length - 1 : 250} min={1} defaultValue={initialArrowNumb}/>       
            <></>
        </HideMenuItem>
    );
};

export default ArrowNumber;
