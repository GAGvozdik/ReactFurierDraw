
import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { UpdatePoints } from '../components/redux/actions'; // Импорт action
import { Point, State, UpdatePointsAction } from '../components/redux/types'; // Импорт action


let CANVAS_WIDTH = 640;
let CANVAS_HEIGHT = 480;
let CIRCLE_RADIUS = 48;


interface AppBarProps {
    children: React.ReactNode;
    viewBox: string; // `190 110 200 200`
  }

const SvgCanvas: React.FC<AppBarProps> = ({ children, viewBox }) => {


  // console.log(viewBox)

  const svgRef = useRef<SVGSVGElement | null>(null);

  const [isDown, setIsDown] = useState(false);
  const [posX, setPosX] = useState(290);
  const [posY, setPosY] = useState(130);

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsDown(true);
    setOffset({
      x: e.clientX - posX,
      y: e.clientY - posY,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDown) return;
    setPosX(e.clientX - offset.x);
    setPosY(e.clientY - offset.y);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  // Attach mouse move and up handlers to the window
  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDown]);



  
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


    <div>{posX}</div>
    <div>{posY}</div>
    {/* <button onClick={UpdateCurrentPoints}>UpdatePoints</button> */}



    <div style={{ gridColumnStart: 2, gridColumnEnd: 2, gridRowStart: 2, gridRowEnd: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        
        <svg
            ref={svgRef}
            // viewBox={viewBox}
            // viewBox={`${offset.x} ${offset.y} ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
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
            <circle
                cx={posX}
                cy={posY}
                r={15}
                stroke="yellow"
                fill="#131313"
                strokeWidth="5"
            />

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
    