import React from 'react';

interface ArrowProps {
  x0: number;
  y0: number;
  angle: number;
  length: number;
  arrowHeadLength?: number; // Длина наконечника стрелки
}

const Arrow: React.FC<ArrowProps> = ({
  x0,
  y0,
  angle,
  length,
  arrowHeadLength = 10, // Значение по умолчанию для длины наконечника
}) => {
  const radianAngle = (angle * Math.PI) / 180;

  // Конечные координаты основной линии стрелки (короткой на длину наконечника)
  const adjustedLength = length - arrowHeadLength + 2; // Уменьшаем длину на длину наконечника
  const x1 = x0 + adjustedLength * Math.cos(radianAngle);
  const y1 = y0 + adjustedLength * Math.sin(radianAngle);

  // Конечные координаты наконечника
  const xf1 = x0 + length * Math.cos(radianAngle);
  const yf1 = y0 + length * Math.sin(radianAngle);

  // Координаты для наконечника стрелки
  const arrowHeadAngle = Math.PI / 6; // Угол наконечника (30 градусов)

  const x2 = xf1 - arrowHeadLength * Math.cos(radianAngle - arrowHeadAngle);
  const y2 = yf1 - arrowHeadLength * Math.sin(radianAngle - arrowHeadAngle);
  
  const x3 = xf1 - arrowHeadLength * Math.cos(radianAngle + arrowHeadAngle);
  const y3 = yf1 - arrowHeadLength * Math.sin(radianAngle + arrowHeadAngle);

  return (
    <g>
      {/* Основная линия стрелки */}
      <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="black" strokeWidth={2} />
      {/* Наконечник стрелки */}
      <polygon points={`${xf1},${yf1} ${x2},${y2} ${x3},${y3}`} fill="black" />

    </g>
  );
};

export default Arrow;
