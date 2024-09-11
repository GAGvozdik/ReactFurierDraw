
import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { UpdatePoints } from '../redux/actions'; // Импорт action
import { Point, State, UpdatePointsAction } from '../redux/types'; // Импорт action

import { UpdateOpenClose } from '../redux/actions'; // Импорт action
import { UpdateOpenCloseAction } from '../redux/types'; // Импорт action
import { Button } from '@mui/material';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import { IconButton, styled } from '@mui/material';



interface AppBarProps {
    children: React.ReactNode;
    viewBox?: string; // `190 110 200 200`
}
const SvgCanvas: React.FC<AppBarProps> = ({ children, viewBox }) => {


  const data = useSelector((state: State) => state.points);
//   const dispatch = useDispatch();
// const [open, setOpen] = useState(false);

// const handleDrawerOpen = () => {
//     setOpen(true);
//     dispatch<UpdateOpenCloseAction>(UpdateOpenClose(open)); 
    
// };
  let points: number[][];

  points = data.map(innerArray => innerArray[data[0].length - 1 ]);

  // Находим минимальные и максимальные значения x и y
  const xValues = points.map(point => point[0]);
  const yValues = points.map(point => point[1]);

  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  // Задаем размеры viewBox
  const padding = 10; // Отступы для viewBox
  const viewWidth = maxX - minX + 2 * padding;
  const viewHeight = maxY - minY + 2 * padding;




  const [svgWidth, setWidth] = useState(0);
  const [svgHeight, setHeight] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

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

  // const initialPosition = useSelector((state: State) => state.position);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [position, setPosition] = useState({x: 0, y: 0});

  // useEffect(() => {setPosition({ x: initialPosition.x, y: initialPosition.y })}, [initialPosition])

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [scale, setScale] = useState(1);

  const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    if (event.button === 0) {
      setIsDragging(true);
      setDragStart({ x: event.clientX, y: event.clientY }); 
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    setX(event.clientX);
    setY(event.clientY);
    if (isDragging) {
      const dx = event.clientX - dragStart.x;
      const dy = event.clientY - dragStart.y;

      // Обновление position
      setPosition({ x: position.x - dx * scale, y: position.y - dy * scale }); 

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

  const handleZoom = (event: WheelEvent) => {
    const zoomStep = 1.02; // Шаг зума
    
    // Обновляем положение SVG
    // setPosition({
    //   x: event.clientX + svgWidth / 2,
    //   y: event.clientY + svgHeight / 2 
    // });

    if (event.deltaY < 0) {
      setScale(scale * zoomStep);
    } else {
      setScale(scale / zoomStep);
    }

    // Определяем точку зума (курсор мыши)
    const zoomPointX = event.clientX - position.x;
    const zoomPointY = event.clientY - position.y;


  };



  useEffect(() => {
    document.addEventListener('wheel', handleZoom);

    return () => {
      document.removeEventListener('wheel', handleZoom);
    };
  }, [scale]);

  
  const getDefPos = () => {
    setPosition({x: 0, y: 0});
    setScale(1);
  };
  

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.common.white, // Сделаем иконку светлой
    transition: theme.transitions.create(['background-color', 'box-shadow']), // Добавляем анимацию перехода
    '&:hover': {
      backgroundColor: 'grey', // Изменяем фон при наведении
    },

  }));


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
      {/* <div>{position.x}----{position.y}</div> */}
      <div
        style={{
          gridColumnStart: 3,
          gridColumnEnd: 3,
          gridRowStart: 2,
          gridRowEnd: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <StyledIconButton onClick={getDefPos}>
          <ZoomInMapIcon />
        </StyledIconButton>
      </div>



      {/* <div>{x}----{y}---{dragStart.x}--{dragStart.y}</div> */}
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



// const [data, setData] = useState<number[][][] | undefined>(undefined);

// useEffect(() => {
//   // fetch('../public/data.json')
//   fetch('/data.json')
//     .then((response) => response.json())
//     .then((d) => setData(d))
//     .catch((error) => console.error('Ошибка при загрузке данных:', error));


// }, [data]);