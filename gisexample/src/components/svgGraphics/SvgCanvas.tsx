
import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { UpdatePoints } from '../redux/actions'; // Импорт action
import { Point, State, UpdatePointsAction } from '../redux/types'; // Импорт action


interface AppBarProps {
    children: React.ReactNode;
    viewBox?: string; // `190 110 200 200`
}
const SvgCanvas: React.FC<AppBarProps> = ({ children, viewBox }) => {
  const [svgWidth, setWidth] = useState(0);
  const [svgHeight, setHeight] = useState(0);
  const divRef = useRef<HTMLDivElement>(null); // Создаем ref для div

  // Функция для обновления размеров
  const updateDimensions = () => {
    if (divRef.current) {
      setWidth(divRef.current.offsetWidth);
      setHeight(divRef.current.offsetHeight);
    }
  };

  // Выполняем updateDimensions при монтировании, при изменении размера окна И при изменении размеров родительского элемента
  useEffect(() => {
    updateDimensions(); // Инициализация размеров при монтировании
    window.addEventListener('resize', updateDimensions); // Добавляем обработчик события resize
    const resizeObserver = new ResizeObserver(updateDimensions); // Создаем ResizeObserver
    if (divRef.current) {
      resizeObserver.observe(divRef.current); // Наблюдаем за изменениями размеров родительского элемента
    }
    return () => {
      window.removeEventListener('resize', updateDimensions); // Удаляем обработчик события resize
      resizeObserver.disconnect(); // Отключаем ResizeObserver при размонтировании
    };
  }, []);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    if (event.button === 0) {
      setIsDragging(true);
      setDragStart({ x: event.clientX, y: event.clientY }); 
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      const dx = event.clientX - dragStart.x;
      const dy = event.clientY - dragStart.y;

      // Обновление position
      setPosition({ x: position.x - dx, y: position.y - dy }); 

      // Обновление dragStart после каждого движения
      setDragStart({ x: event.clientX, y: event.clientY }); 
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);



  const g = useSelector((state: State) => state.points);



  return (
    <div
      style={{
        width: '100%',
        height: 'calc(100vh - 64px)',
        display: 'grid',
        gridTemplateColumns: '15% 70% 15%',
        gridTemplateRows: '4% 92% 4%',
        gap: '0px',
        margin: '0px',
        backgroundColor: '#232324',
      }}
    >
      {/* <div>{g[0]}</div> */}


      <div
        ref={divRef}
        style={{
          gridColumnStart: 2,
          gridColumnEnd: 2,
          gridRowStart: 2,
          gridRowEnd: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <svg
          ref={svgRef}
          viewBox={`${position.x} ${position.y} ${svgWidth} ${svgHeight}`}
          onMouseDown={handleMouseDown}
          style={{
            width: '100%',
            height: '100%',
            border: '4px solid #3b3f40',
            borderRadius: '10px',
            cursor: 'pointer',
            backgroundColor: '#101010',
          }}
        >
          {children}
        </svg>
      </div>
    </div>
  );
};

export default SvgCanvas;
// let g =[
//   [
//     [292.58975360596975, 214.56308599971317], 
//     [291.3656779435257, 211.76034876622998], 
//     [290.8729650764413, 208.50543895577056], 
//     [268.96567316581167, 227.98121405432585], 
//     [259.3763572438135, 233.23713226321485]
//   ]
// ];
    
// const dispatch = useDispatch();

// const UpdateCurrentPoints = () => {
//   const newPoints: number[][][] = [
//     [
//       [ 100, 100 ],
//       [ 200, 200 ],
//       [ 300, 300 ],
//     ],
//   ];
//   dispatch<UpdatePointsAction>(UpdatePoints(newPoints)); // Исправлено 
// };




// const g = useSelector((state: State) => state.points);
// 