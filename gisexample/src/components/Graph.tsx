import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import Arrow from './Arrow';

const Graph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);


  // Параметры неподвижной стрелки
  const staticArrowProps = {
    x0: 400,
    y0: 400,
    angle: 0,
    length: 100,
  };

  // Параметры вращающейся стрелки и третьей стрелки
  const rotatingArrowProps = {
    length: 100,
    rotationSpeed: 1, // Угол вращения в градусах за один интервал
    thirdLength: 50,
    thirdRotationSpeed: 3, // Скорость вращения третьей стрелки вокруг конца второй
    updateInterval: 1
  };

  const [angle, setAngle] = useState(0); // Угол для вращающейся стрелки
  const [thirdAngle, setThirdAngle] = useState(0); // Угол для третьей стрелки
  


  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Анимация для вращающейся стрелки
    const animation = d3.interval(() => {
      setAngle((prevAngle) => (prevAngle + rotatingArrowProps.rotationSpeed) % 360);
      setThirdAngle((prevThirdAngle) => (prevThirdAngle + rotatingArrowProps.thirdRotationSpeed) % 360);
    }, rotatingArrowProps.updateInterval); // Интервал обновления

    return () => {
      animation.stop(); // Останавливаем анимацию при размонтировании компонента
    };
  }, []);

  // Позиция конца неподвижной стрелки
  const rotatingArrowX = staticArrowProps.x0 + staticArrowProps.length * Math.cos((staticArrowProps.angle * Math.PI) / 180);
  const rotatingArrowY = staticArrowProps.y0 + staticArrowProps.length * Math.sin((staticArrowProps.angle * Math.PI) / 180);

  // Позиция конца вращающейся стрелки
  const secondArrowX = rotatingArrowX + rotatingArrowProps.length * Math.cos((angle * Math.PI) / 180);
  const secondArrowY = rotatingArrowY + rotatingArrowProps.length * Math.sin((angle * Math.PI) / 180);

  // Позиция конца третьей стрелки (вращается вокруг конца второй)
  const thirdArrowX = secondArrowX + rotatingArrowProps.thirdLength * Math.cos((thirdAngle * Math.PI) / 180);
  const thirdArrowY = secondArrowY + rotatingArrowProps.thirdLength * Math.sin((thirdAngle * Math.PI) / 180);

  return (
    <div style={{margin: `20px`}}>
      <svg ref={svgRef} width="800" height="700" style={{ border: '1px solid black' }}>
        {/* Неподвижная стрелка */}
        <Arrow 
          x0={staticArrowProps.x0} 
          y0={staticArrowProps.y0} 
          angle={staticArrowProps.angle} 
          length={staticArrowProps.length} 
        />
        
        {/* Вращающаяся стрелка */}
        <Arrow 
          x0={rotatingArrowX} 
          y0={rotatingArrowY} 
          angle={angle} 
          length={rotatingArrowProps.length} 
        />

        {/* Третья стрелка */}
        <Arrow 
          x0={secondArrowX} 
          y0={secondArrowY} 
          angle={thirdAngle} 
          length={rotatingArrowProps.thirdLength} 
        />
      </svg>
    </div>
  );
};

export default Graph;