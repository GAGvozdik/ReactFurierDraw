import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useRef, useEffect, useState } from 'react';

import Divider from '@mui/material/Divider';

interface HideMenuItemProps {
    children: React.ReactNode;
    open: boolean;
    menuItemText: string;
    menuIcon?: React.ReactNode;
    type?: 'option' | 'optionNav';
}

const HideMenuItem: React.FC<HideMenuItemProps> = ({ children, open, menuItemText, menuIcon, type = 'option' }) => {

    const [pr, setPr] = useState('WGS84'); // Изначальное значение pr

    const handleListItemClick = (index: string) => {
        setPr(index);
    };

    return (
        <div>
            { type == 'optionNav' ? 
                <>
                    <ListItem key={'Lambert Conic'} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            // onClick={} 
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
                                {
                                    open ? <>{menuIcon && menuIcon}</>  : <></>
                                }
                            </ListItemIcon>


                        
                        </ListItemButton>
                    
                    </ListItem>
                </>
            :
                <>
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
                                {
                                    open ? <>{menuIcon && menuIcon}</>  : <></>
                                }
                            </ListItemIcon>

                            <div>

                                <ListItemText primary={menuItemText} sx={{ opacity: open ? 1 : 0 }} />
                                {
                                    open ? children : <></>
                                }
                                
                            </div>
                        
                        </ListItemButton>
                    
                    </ListItem>
                    
                    <Divider />
                </>
            }
        </div>
    )
}

export default HideMenuItem;









