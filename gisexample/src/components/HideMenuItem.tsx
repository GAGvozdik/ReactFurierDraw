import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useRef, useEffect, useState } from 'react';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'

interface HideMenuItemProps {
    children: React.ReactNode;
    open: boolean;
    menuItemText: string;
}

const HideMenuItem: React.FC<HideMenuItemProps> = ({ children, open, menuItemText }) => {

    const [pr, setPr] = useState('WGS84'); // Изначальное значение pr

    const handleListItemClick = (index: string) => {
        setPr(index);
    };

    return (
        <div>

            <ListItem key={'Lambert Conic'} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                onClick={() => handleListItemClick('Lambert Conic')} // Добавляем обработчик клика
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                }}
            >
                    
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    <CircleOutlinedIcon />
                </ListItemIcon>


                {
                    open ? children : <></>
                }
                
                <ListItemText primary={menuItemText} sx={{ opacity: open ? 1 : 0 }} />
            
            </ListItemButton>
            </ListItem>
        
        </div>
    )
}

export default HideMenuItem;









