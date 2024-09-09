import React, { useState } from 'react';

const DraggableSVG: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
        if (event.button === 0) { // Проверяем, что нажата левая кнопка мыши
            setIsDragging(true);
            setOffset({
                x: event.clientX - position.x,
                y: event.clientY - position.y,
            });
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: event.clientX - offset.x,
                y: event.clientY - offset.y,
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
        <svg
            width="100"
            height="100"
            xmlns="http://www.w3.org/2000/svg"
            onMouseDown={handleMouseDown}
            style={{
                cursor: isDragging ? 'grabbing' : 'grab',
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: isDragging ? 'none' : 'transform 0.1s',
            }}
        >
            <circle cx="50" cy="50" r="40" fill="blue" />
        </svg>
    );
};

export default DraggableSVG;
