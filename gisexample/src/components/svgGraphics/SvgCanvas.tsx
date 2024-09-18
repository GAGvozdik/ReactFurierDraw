
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
import './SvgCanvas.css';



interface AppBarProps {
    children: React.ReactNode;
    viewBox?: string; // `190 110 200 200`
}
const SvgCanvas: React.FC<AppBarProps> = ({ children }) => {
// function SvgCanvas() {

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


  const divRef = useRef<HTMLDivElement>(null); // Создаем ref для div

  let initWidth = 0;
  let initHeight = 0;
  
  if (data){
    if (divRef.current) {
      initWidth = divRef.current.offsetWidth;
      initHeight = divRef.current.offsetHeight;
      
    }

  }
  
  const svgRef = useRef<SVGSVGElement | null>(null);
  
  const zoomLimit = {max: 150, min: 0};


  const [svgWidth, setWidth] = useState(maxX * 10);
  const [svgHeight, setHeight] = useState(maxY * 10);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [position, setPosition] = useState({x: 0, y: 0});
  const [dragStart, setDragStart] = useState({x: 0, y: 0});

  // {x: maxX * 2, y: maxY * 2}

  const [isDragging, setIsDragging] = useState(false);

  // Функция для обновления размеров
  const updateDimensions = () => {
    if (divRef.current) {
      setWidth(divRef.current.offsetWidth);
      setHeight(divRef.current.offsetHeight);
    }
  };





  useEffect(() => {
    console.log('gdfgd')
    getDefPos();
  }, [data]);


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
      // setDragStart({ x: event.clientX, y: event.clientY }); 


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
    // const zoomStep = 0.1; 
    
    setDragStart({ x: event.clientX, y: event.clientY }); 

    if (event.deltaY < 0 && scale < zoomLimit.max) {
      
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

    return () => {
      document.removeEventListener('wheel', handleZoom);
    };
  }, [scale]);

  
  const getDefPos = () => {
    setPosition({x: minX + (maxX - minX) / 2 - svgWidth / 2, y: minY + (maxY - minY) / 2 - svgHeight / 2});
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
        style={{
          gridColumnStart: 1,
          gridColumnEnd: 1,
          gridRowStart: 2,
          gridRowEnd: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          color: 'white',
        }}
      >
        {/* <div>
          <b>position : </b>{position.x.toFixed()}--{position.y.toFixed()}
        </div>

        <div>
          <b>dragStart : </b>{dragStart.x.toFixed()}--{dragStart.y.toFixed()}
        </div>
        
        <div> 
          <b>svgHeight : </b>{svgHeight.toFixed()}
        </div>
        
        <div> 
          <b>svgWidth : </b>{svgWidth.toFixed()}
        </div>
        
        <div> 
          <b>viewbox : </b>{`${position.x.toFixed()} ${position.y.toFixed()} ${(scale * svgWidth).toFixed()} ${(scale * svgHeight).toFixed()}`}
        </div>
        <div> 
          <b>x : </b>{x.toFixed()} y : {y.toFixed()}
        </div> */}

      </div>


      {/* <div>{viewHeight}</div> */}
      <div
        className='.prevent-select'
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
      {/* <div>{x}----{y}</div> */}
      {/* <div>{position.x}----{position.y}</div> */}
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
          // x: minX + (maxX - minX) / 2,
          // y: minY + (maxY - minY) / 2,
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
          {/* <circle r="45" cx={position.x + svgWidth * scale / 2 + (maxX - minX) / 2} cy={position.y + svgHeight * scale / 2 + (maxY - minY) / 2} fill="red" /> */}
          


          {/* <circle r={5 * scale} cx={position.x} cy={position.y} fill="red" />
          <circle r={5 * scale} cx={position.x + svgWidth * scale / 2} cy={position.y + svgHeight * scale / 2} fill="green" />
          <circle r={5 * scale} cx={maxX} cy={minY} fill="grey" />
          <circle r={5 * scale} cx={minX} cy={maxY} fill="grey" />
          <circle r={5 * scale} cx={minX} cy={minY} fill="grey" />
          <circle 
            r={5 * scale} 
            cx={minX + (maxX - minX) / 2} 
            cy={minY + (maxY - minY) / 2} 
            fill="purple" 
          /> */}
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