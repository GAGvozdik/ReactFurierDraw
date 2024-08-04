import React from 'react';

interface ArrowProps {
  x0: number;
  y0: number;
  x1: number; // Координата X конца стрелки
  y1: number; // Координата Y конца стрелки

  endWidth: number;
  lineWidth: number;
}


const Arrow: React.FC<ArrowProps> = ({
  x0,
  y0,
  x1,
  y1,
  endWidth, 
  lineWidth,
}) => {


    // Вычисляем угол стрелки
    const angle = Math.atan2(y1 - y0, x1 - x0) * (180 / Math.PI);

    // Вычисляем координаты левого и правого углов наконечника
    const baseAngle = angle * Math.PI / 180; // Угол стрелки в радианах
    const halfAngle = 30 * Math.PI / 180; // Половина угла наконечника

    let arrowLenght: number = Math.pow((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0), 0.5);

    let lineEndX: number = x0 + (x1 - x0) * (arrowLenght - endWidth * Math.cos(halfAngle)) / arrowLenght;
    let lineEndY: number = y0 + (y1 - y0) * (arrowLenght - endWidth * Math.cos(halfAngle)) / arrowLenght;



    const leftCornerX = x1 - endWidth * Math.cos(baseAngle + halfAngle);
    const leftCornerY = y1 - endWidth * Math.sin(baseAngle + halfAngle);

    const rightCornerX = x1 - endWidth * Math.cos(baseAngle - halfAngle)
    const rightCornerY = y1 - endWidth * Math.sin(baseAngle - halfAngle);

    return (
        <g>

            {/* Наконечник стрелки */}
            <polygon points={`${x1},${y1} ${leftCornerX},${leftCornerY} ${rightCornerX},${rightCornerY}`} fill="black" />


            {/* Основная линия стрелки */}
            <line x1={x0} y1={y0} x2={lineEndX} y2={lineEndY} stroke="black" strokeWidth={lineWidth} />
            

        </g>
    );
};

export default Arrow;