import React, { useRef, useEffect, useState } from 'react';
import pako from 'pako';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { UpdatePoints } from '../redux/actions'; // Импорт action
import { Point, State, UpdatePointsAction } from '../redux/types'; // Импорт action

const FileLoader: React.FC = () => {
  const [data, setData] = useState<number[][][] | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null); // Добавляем ref для input

  const dispatch = useDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Получаем выбранный файл
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string); // Парсим JSON
          // setData(jsonData);
          dispatch<UpdatePointsAction>(UpdatePoints(jsonData)); // Отправляем данные в Redux
        } catch (error) {
          console.error('Ошибка при разборе JSON:', error);
        }
      };
      reader.readAsText(file); // Читаем содержимое файла
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Открываем диалог выбора файла
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".json"
        ref={fileInputRef} // Прикрепляем ref к input
        style={{ display: 'none' }} // Скрываем input
        onChange={handleFileChange}
      />
      <Button variant="outlined" onClick={handleClick}>
        Load data
      </Button>
    </div>
  );
};

export default FileLoader;
