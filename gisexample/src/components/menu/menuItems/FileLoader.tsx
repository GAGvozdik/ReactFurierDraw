import React, { useRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { UpdatePoints } from '../../redux/actions'; 
import { Point, State, UpdatePointsAction } from '../../redux/types'; 
import HideMenuItem from './HideMenuItem';
import DownloadIcon from '@mui/icons-material/Download';

const FileLoader: React.FC = () => {
  const [data, setData] = useState<number[][][] | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null); 

  const dispatch = useDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          dispatch<UpdatePointsAction>(UpdatePoints(jsonData)); 
        } catch (error) {
          console.error('Ошибка при разборе JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };

  return (
    <HideMenuItem 
      menuItemText = {''}
      menuIcon={<><DownloadIcon /></>}
  >          
      <input
        type="file"
        accept=".json"
        ref={fileInputRef} 
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <Button variant="outlined" onClick={handleClick}>
        Load data
      </Button>

  </HideMenuItem>

  );
};

export default FileLoader;
