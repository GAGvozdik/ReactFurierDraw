import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface CustomSliderProps {
  onChange: (value: number) => void; // Обработчик изменений для передачи значения
}

const CustomSlider: React.FC<CustomSliderProps> = ({ onChange }) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      onChange(newValue); // Передаем новое значение родительскому компоненту
    }
  };

  return (
    <Box sx={{ width: 240 }}>
      <Slider
        size="small"
        defaultValue={1}
        aria-label="Small"
        valueLabelDisplay="auto"
        onChange={handleChange} // Установка обработчика изменения
      />
    </Box>
  );
}

export default CustomSlider;