import * as React from 'react';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import './HideMenu.css'

import HideMenuItem from './HideMenuItem';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
interface HidingMenuProps {
  children: React.ReactNode;
  open: boolean;
}



const HidingMenu: React.FC<HidingMenuProps> = ({ children, open }) => {
  return (
    // <div
      // style={{ overflow: 'hidden' }}
    //   className="scrollbar-container" // Add class for custom scrollbar styling
    // >

<div className="scrollbar my-style">
      <div className="force-overflow">

  

      <List>

        {/* <HideMenuItem 
            menuItemText = {'Up'}
            open={true} 
            menuIcon={<><ArrowDropUpOutlinedIcon /></>}
            type={'optionNav'}
        >  
            <></>
        </HideMenuItem> */}

        {children}


        {/* <HideMenuItem 
            menuItemText = {'Down'}
            open={true} 
            menuIcon={<><ArrowDropDownOutlinedIcon /></>}
            type={'optionNav'}
        >  
            <></>
        </HideMenuItem> */}


      </List>
    </div>

    </div>

  );
};



export default HidingMenu;
