import React, {useEffect, useState} from 'react';
import HideMenuItem from '../HideMenuItem';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useSelector, useDispatch } from 'react-redux';
import { UpdateIsLineCompleted } from '../../redux/actions'; // Импорт action

function CompleteLine() {    
    
    const dispatch = useDispatch();


    const handleIsLineComleted = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isLineCompleted = event.target.value === "Complete line"; 
        dispatch(UpdateIsLineCompleted(isLineCompleted)); 
    };

    return(
        
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
    );
};

export default CompleteLine;