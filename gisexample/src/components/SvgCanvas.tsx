
import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;
const CIRCLE_RADIUS = 48;


interface AppBarProps {
    children: React.ReactNode;
    viewBox: string; // `190 110 200 200`
  }

const SvgCanvas: React.FC<AppBarProps> = ({ children, viewBox }) => {

    const svgRef = useRef<SVGSVGElement | null>(null);

  const [isDown, setIsDown] = useState(false);
  const [posX, setPosX] = useState(CANVAS_WIDTH * 0.25);
  const [posY, setPosY] = useState(CANVAS_HEIGHT / 2);
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


    <div style={{ gridColumnStart: 2, gridColumnEnd: 2, gridRowStart: 2, gridRowEnd: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        
        <svg
            ref={svgRef}
            viewBox={viewBox}
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
            {/* <circle
                cx={posX}
                cy={posY}
                r={15}
                stroke="yellow"
                fill="#131313"
                strokeWidth="5"
            /> */}
          {children}
        </svg>
      </div>
    </div>
  );
};




export default SvgCanvas;