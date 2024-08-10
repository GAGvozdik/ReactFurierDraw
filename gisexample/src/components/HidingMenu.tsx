import * as React from 'react';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';

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
    //   style={{ overflow: 'hidden' }}
      className="scrollbar-container" // Add class for custom scrollbar styling
    >
      <List>
        {/* ... Your List content ... */}
        {children}
      </List>
    </div>
  );
};



export default HidingMenu;
