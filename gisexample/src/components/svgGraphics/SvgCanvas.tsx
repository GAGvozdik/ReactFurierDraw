
import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UpdatePoints } from '../redux/actions'; // Импорт action
import { Point, State, UpdatePointsAction } from '../redux/types'; // Импорт action
import { IconButton, styled } from '@mui/material';
import './SvgCanvas.css';
import SvgCross from './svgElements/SvgCross';


interface AppBarProps {
    children: React.ReactNode;
    viewBox?: string; // `190 110 200 200`
}
const SvgCanvas: React.FC<AppBarProps> = ({ children }) => {

  const data = useSelector((state: State) => state.points);

  let points: number[][];

  points = data.map(innerArray => innerArray[data[0].length - 1 ]);

  // Находим минимальные и максимальные значения x и y
  const xValues = points.map(point => point[0]);
  const yValues = points.map(point => point[1]);

  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  const divRef = useRef<HTMLDivElement>(null); // Создаем ref для div

  const svgRef = useRef<SVGSVGElement | null>(null);
  
  const zoomLimit = {max: 150, min: 0};

  const [svgWidth, setWidth] = useState(maxX * 10);
  const [svgHeight, setHeight] = useState(maxY * 10);
  const [position, setPosition] = useState({x: 0, y: 0});
  const [dragStart, setDragStart] = useState({x: 0, y: 0});

  const [isDragging, setIsDragging] = useState(false);

  const [currentWidth, setCurrentWidth] = useState(0);






  // Функция для обновления размеров
  const updateDimensions = () => {
    if (divRef.current) {
      const newWidth = divRef.current.offsetWidth;
      const newHeight = divRef.current.offsetHeight;
        
      // Вычисляем половину разницы между старой и новой шириной
      const widthDifference = (newWidth - currentWidth) / 2; 

      setWidth(newWidth); 
      setHeight(newHeight);
    }
  };

  // Выполняем updateDimensions при монтировании, при изменении размера окна И при изменении размеров родительского элемента
  useEffect(() => {
    window.addEventListener('resize', updateDimensions); // Добавляем обработчик события resize
    const resizeObserver = new ResizeObserver(updateDimensions); // Создаем ResizeObserver
    if (divRef.current) {
      resizeObserver.observe(divRef.current); // Наблюдаем за изменениями размеров родительского элемента
    }
    return () => {
      window.removeEventListener('resize', updateDimensions); // Удаляем обработчик события resize
      resizeObserver.disconnect(); // Отключаем ResizeObserver при размонтировании
    };
  }, [svgWidth]); // Добавляем зависимость от svgWidth
    

  const defaultZoom = useSelector((state: State) => state.defaultZoom);
  let lastArrowEnd = useSelector((state: State) => state.lastArrowEnd);


  
  useEffect(() => {
    
  }, [lastArrowEnd]);



  
  useEffect(() => {
    getDefPos();
  }, [data, defaultZoom]);


  useEffect(() => {
    // getDefPos();

    // updateDimensions();
    // setPosition(
    //   {
    //     x: minX + (maxX - minX) / 2 - svgWidth * scale / 2, 
    //     y: minY + (maxY - minY) / 2 - svgHeight * scale / 2
    //   }
    // );

    setPosition(
      {
        x: position.x, 
        y: position.y, 
      }
    );

  }, [svgWidth, svgHeight]);


  const [scale, setScale] = useState(1);

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
      setPosition({ x: position.x - dx * scale, y: position.y - dy * scale }); 
      console.log('handleMouseMove')

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

  const handleZoom = (event: WheelEvent) => {
    const zoomStep = 1.1; // Шаг зума

    if (event.deltaY <= 0 && scale < zoomLimit.max) {
      
      setPosition({ 
        x: position.x - svgWidth * (zoomStep * scale - scale) / 2,
        y: position.y - svgHeight * (zoomStep * scale - scale) / 2,
      }); 

      setScale(scale * zoomStep);

    } else if (scale > zoomLimit.min) {
      setScale(scale / zoomStep);

      setPosition({ 
        x: position.x - svgWidth * (scale / zoomStep - scale) / 2,
        y: position.y - svgHeight * (scale / zoomStep - scale) / 2,
      }); 

    }

  };

  useEffect(() => {
    document.addEventListener('wheel', handleZoom);
  }, [position]);

  
  const getDefPos = () => {
    setPosition({x: minX + (maxX - minX) / 2 - svgWidth / 2, y: minY + (maxY - minY) / 2 - svgHeight / 2});
    console.log('getDefPos');
    setScale(1);
  };




  return (
    <div
      className='prevent-select'
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
          viewBox={`${position.x} ${position.y} ${scale * svgWidth} ${scale * svgHeight}`}
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

          <SvgCross 
            xx={position.x}
            yy={position.y}
            svgWidth={svgWidth}
            svgHeight={svgHeight}
            scale={scale}
          /> 
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

// const [data, setData] = useState<number[][][] | undefined>(undefined);

// useEffect(() => {
//   // fetch('../public/data.json')
//   fetch('/data.json')
//     .then((response) => response.json())
//     .then((d) => setData(d))
//     .catch((error) => console.error('Ошибка при загрузке данных:', error));
// }, [data]);