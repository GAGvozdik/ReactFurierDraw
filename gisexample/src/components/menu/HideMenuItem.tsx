import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useRef, useEffect, useState } from 'react';

import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from 'react-redux';
import { Point, State, UpdateOpenCloseAction } from '../redux/types'; // Импорт action

interface HideMenuItemProps {
    children: React.ReactNode;

    menuItemText: string;
    menuIcon?: React.ReactNode;
    type?: 'option' | 'optionNav';
}

const HideMenuItem: React.FC<HideMenuItemProps> = ({ children, menuItemText, menuIcon, type = 'option' }) => {


    const open = useSelector((state: State) => state.open);



    return (
        <div>
            
            { type == 'optionNav' ? 
                <>
                    <ListItem 
                        key={'Lambert Conic'} 
                        disablePadding 
                        sx={{ 
                            display: 'block',
                            float: 'right',
                            backgroundColor: 'grey' 
                            }}
                    >
                        <ListItemButton
                            onClick={() => {}}
                            sx={{
                                minHeight: 48,
                                px: 2.5,
                            }}
                        >
                                
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                {
                                    open ? 
                                        <div
                                            style={{                                    
                                                display: 'flex',
                                                justifyContent: 'right',
                                                backgroundColor: '#232323'}}
                                            >
                                            {menuIcon && menuIcon}
                                        </div>  
                                            : 
                                        <>
                                        </>
                                }
                            </ListItemIcon>                        
                        </ListItemButton>
                    </ListItem>
                </>
            :
                <>
                    <ListItem key={'Lambert Conic'} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                // float: 'center'
                            }}
                        >
                                {       
                                    open ? 
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'left',
                                                
                                            }}
                                        >
                                            {
                                                <>{menuIcon && menuIcon}</>
                                            }
                                        </ListItemIcon>                                     
                                    : 
                                    <></>
                                }        


                            <div>

                                <ListItemText primary={menuItemText} sx={{ opacity: !open ? 1 : 0 }} />
                                {
                                    !open ? children : <></>
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









