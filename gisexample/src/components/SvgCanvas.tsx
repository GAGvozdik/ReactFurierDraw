import React, { useEffect, useRef, useState } from 'react';

interface AppBarProps {
  children: React.ReactNode;
  viewBox: string; // Допустим, что viewBox передается в формате "minX minY width height"
}

let canvasWidth: number = 1200;
let canvasHeight: number = 700;

const SvgCanvas: React.FC<AppBarProps> = ({ children, viewBox }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [viewboxPosition, setViewboxPosition] = useState({ x: 0, y: 0 });
  const [viewboxScale, setViewboxScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Храним начальное значение viewBox
  const [initialViewBox, setInitialViewBox] = useState<string | null>(null);

  useEffect(() => {
    // Извлечение значений из переданного viewBox
    const [minX, minY, width, height] = viewBox.split(' ').map(Number);
    
    // Устанавливаем начальное значение viewBox
    setInitialViewBox(viewBox);
    
    // Устанавливаем позицию и масштаб
    setViewboxPosition({ x: minX - width / 2, y: minY });
    setViewboxScale(Math.max(width / canvasWidth, height / canvasHeight));
  }, [viewBox]);

  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scale = (e.deltaY < 0) ? 0.9 : 1.1;
      const newScale = viewboxScale * scale;

      if (newScale < 8.0 && newScale > 1 / 256) {
        const mouseX = e.clientX - svgElement.getBoundingClientRect().left;
        const mouseY = e.clientY - svgElement.getBoundingClientRect().top;

        const mouseScaled = { x: mouseX * viewboxScale, y: mouseY * viewboxScale };
        const currentPosition = { x: viewboxPosition.x, y: viewboxPosition.y };
        const centerPosition = {
          x: mouseScaled.x + currentPosition.x,
          y: mouseScaled.y + currentPosition.y,
        };

        setViewboxPosition({
          x: (viewboxPosition.x - centerPosition.x) * scale + centerPosition.x,
          y: (viewboxPosition.y - centerPosition.y) * scale + centerPosition.y,
        });
        setViewboxScale(newScale);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 1) {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = (e.clientX - dragStart.x) / viewboxScale;
        const dy = (e.clientY - dragStart.y) / viewboxScale;

        setViewboxPosition((prev) => ({
          x: prev.x - dx,
          y: prev.y - dy,
        }));

        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 1) {
        setIsDragging(false);
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [viewboxPosition, viewboxScale, isDragging, dragStart]);

  let calculatedViewBox: string = `${viewboxPosition.x} ${viewboxPosition.y} ${canvasWidth * viewboxScale} ${canvasHeight * viewboxScale}`;

  const handleReturnZoom = () => {
    if (initialViewBox) {
      const [minX, minY, width, height] = initialViewBox.split(' ').map(Number);
      setViewboxPosition({ x: minX - width / 2, y: minY });
      setViewboxScale(Math.max(width / canvasWidth, height / canvasHeight));
    }
  };

  return (
    <svg 
      ref={svgRef} 
      viewBox={calculatedViewBox} 
      style={{ 
        width: `${canvasWidth}px`, 
        height: `${canvasHeight}px`, 
        border: '4px solid #B3B3B3', 
        borderRadius: '35px', 
        cursor: 'pointer',
        margin: '20px'
      }}
    >
      {children}
    </svg>
  );
};


export default SvgCanvas;