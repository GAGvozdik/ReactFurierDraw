
import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { UpdatePoints } from '../components/redux/actions'; // Импорт action
import { Point, State, UpdatePointsAction } from '../components/redux/types'; // Импорт action
import DraggableSVG from './Drag';

let CANVAS_WIDTH = 640;
let CANVAS_HEIGHT = 480;
let CIRCLE_RADIUS = 48;


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

  // Выполняем updateDimensions при монтировании и при изменении размера окна
  useEffect(() => {
    updateDimensions(); // Инициализация размеров при монтировании
    window.addEventListener('resize', updateDimensions); // Добавляем обработчик события resize
    return () => window.removeEventListener('resize', updateDimensions); // Удаляем обработчик при размонтировании
  }, []);
  

  const dispatch = useDispatch();

  const UpdateCurrentPoints = () => {
    const newPoints: number[][][] = [
      [
        [ 100, 100 ],
        [ 200, 200 ],
        [ 300, 300 ],
      ],
    ];
    dispatch<UpdatePointsAction>(UpdatePoints(newPoints)); // Исправлено 
  };
  // console.log(viewBox)

  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 600, y: 300 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
      if (event.button === 0) { // Проверяем, что нажата левая кнопка мыши
          setIsDragging(true);
          // setOffset({
          //     x: offset.x + event.clientX,
          //     y: offset.y + event.clientY,
          // });
      }
  };

  const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
          setPosition({
              x: offset.x - event.clientX,
              y: offset.y - event.clientY,
          });
      }
  };




  

  const handleMouseUp = () => {
      setIsDragging(false);
  };

  // Добавляем и удаляем обработчики событий при монтировании и размонтировании компонента
  React.useEffect(() => {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
      };
  }, [isDragging]);




  return (
    <div
    
      style={{
        width: `100%`,
        height: `calc(100vh - 64px)`,
        display: 'grid',
        gridTemplateColumns: '15% 70% 15%',
        gridTemplateRows: '4% 92% 4%',
        gap: '0px',
        margin: '0px',
        backgroundColor: '#232324',
      }}
    >


    {/* <div>{posX}</div> */}
    {/* <div>{posY}</div> */}

    <div>{svgWidth}</div>
    <div>{svgHeight}</div>
    {/* <button onClick={UpdateCurrentPoints}>UpdatePoints</button> */}



    <div ref={divRef} style={{ gridColumnStart: 2, gridColumnEnd: 2, gridRowStart: 2, gridRowEnd: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* <DraggableSVG /> */}
        
        <svg
            ref={svgRef}
            // viewBox={viewBox}
            viewBox={`${position.x} ${position.y} ${svgWidth} ${svgHeight}`}
            onMouseDown={handleMouseDown}
            style={{ 
                width: `100%`,
                height: `100%`,
                // width: CANVAS_WIDTH + 'px', 
                // height: CANVAS_HEIGHT + 'px', 
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
    