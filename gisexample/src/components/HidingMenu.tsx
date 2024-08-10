import * as React from 'react';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import './HideMenu.css'

import HideMenuItem from '../components/HideMenuItem';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
interface HidingMenuProps {
  children: React.ReactNode;
  open: boolean;
}

// Create a styled component for the scrollbar container
const StyledScrollbarContainer = styled('div')`
  /* ... your existing styles ... */
  &.scrollbar-container {
    &::-webkit-scrollbar {
      width: var(--scrollbar-width);
    }
    &::-webkit-scrollbar-track {
      background-color: var(--scrollbar-color-track);
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--scrollbar-color-thumb);
      border-radius: 5px; /* Adjust the border-radius as needed */
    }
  }
`;


const HidingMenu: React.FC<HidingMenuProps> = ({ children, open }) => {
  return (
    <div
      style={{ overflow: 'hidden' }}
    //   className="scrollbar-container" // Add class for custom scrollbar styling
    >

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
  );
};



export default HidingMenu;
