import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

import { createStyles, makeStyles } from '@mui/material/styles'; // Или import { createStyles } from '@mui/styles';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import { Theme, createTheme, ThemeProvider, useTheme} from '@mui/material/styles';

interface HidingMenuProps {
    children: React.ReactNode;
    open: boolean;
}
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
const HidingMenu: React.FC<HidingMenuProps> = ({ children, open }) => {
    
    return (
        <div
            style={{overflow: 'hidden'}}
        >

            <List>
                <></>
                {children}
            </List>




                
        </div>
    );
};

export default HidingMenu;



