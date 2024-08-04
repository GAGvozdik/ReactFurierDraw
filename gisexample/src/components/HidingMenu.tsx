import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

import { createStyles, makeStyles } from '@mui/material/styles'; // Или import { createStyles } from '@mui/styles';
import List from '@mui/material/List';

interface HidingMenuProps {
    children: React.ReactNode;
    open: boolean;
}

const HidingMenu: React.FC<HidingMenuProps> = ({ children, open }) => {

    return (
        <div>
                <List>
                    {children}
                </List>
        </div>
    );
};

export default HidingMenu;



