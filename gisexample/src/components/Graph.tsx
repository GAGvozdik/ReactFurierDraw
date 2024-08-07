import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import Arrow from './Arrow';

interface GraphProps {
    arrowEndWidth?: number; // Ширина наконечника стрелки
    lineWidth?: number;       // Ширина линии стрелки
    updateSpeed?: number;     // Скорость обновления (в миллисекундах)
    arrowNumb?: number;
    isPlaying?: boolean; // Флаг, определяющий, запущена ли анимация
    animLen?: number;
    data?: number[][][];
    contourLineWidth?: number;
}

const Graph: React.FC<GraphProps> = ({
    arrowEndWidth = 10, // Значение по умолчанию
    lineWidth = 4,      // Значение по умолчанию
    updateSpeed = 1000, // Значение по умолчанию 1000 мс
    arrowNumb = 1,
    isPlaying = false,
    animLen = 8,
    data = [],
    contourLineWidth = 1,
}) => {

    if (arrowNumb >= data[0].length - 1){
        arrowNumb = data[0].length - 2;
    }
    if (animLen >= data.length){
        animLen = data.length;
    }

    let contourPoints: string = '';
    let points: number[][] = [];

    if (arrowNumb - 1 < 0){
        points = data.map(innerArray => innerArray[1]);
        contourPoints = points.map(point => point.join(',')).join(' ');
    }
    else {
        points = data.map(innerArray => innerArray[arrowNumb - 1]);
        contourPoints = points.map(point => point.join(',')).join(' ');
    }


    const svgRef = useRef<SVGSVGElement>(null);
    const [currentDataIndex, setCurrentDataIndex] = useState(0);
    const [currentData, setCurrentData] = useState(data[0]); // Начальное состояние - данные из нулевого момента времени
    const [animationInterval, setAnimationInterval] = useState<NodeJS.Timer | null>(null); // Храним интервал анимации

    useEffect(() => {
        // Функция для запуска анимации
        const startAnimation = () => {
            const svg = d3.select(svgRef.current);
            const totalFrames = animLen;

            const interval = setInterval(() => {
                setCurrentDataIndex(prevIndex => {
                    const newIndex = (prevIndex + 1) % totalFrames; // Зацикливаем индекс
                    setCurrentData(data[newIndex]); // Обновляем currentData
                    return newIndex;
                });
            }, updateSpeed); // Используем переданную скорость обновления

            setAnimationInterval(interval);
        };

        // Функция для остановки анимации
        const stopAnimation = () => {
            if (animationInterval) {
                clearInterval(animationInterval);
                setAnimationInterval(null);
            }
        };

        // Запускаем анимацию, если isPlaying true
        if (isPlaying) {
            startAnimation();
        } else {
            stopAnimation(); // Останавливаем анимацию, если isPlaying false
        }

        // Очищаем интервал при размонтировании компонента
        return () => {
            if (animationInterval) {
                clearInterval(animationInterval);
            }
        };
    }, [isPlaying, updateSpeed, data]);

    return (
        <>
            {/* Отрисовка стрелок из currentData, исключая последние две стрелки */}
            {currentData.slice(0, arrowNumb).map((arrow, index) => {
                let x0 = arrow[0];
                let y0 = arrow[1] + 30;
                let x1 = arrow[0];
                let y1 = arrow[1];

                if (index > 0) {
                    x0 = currentData[index - 1][0];
                    y0 = currentData[index - 1][1];
                }

                return (

                    <>
                    
                        <polyline
                            points={contourPoints}
                            fill="none"
                            stroke="yellow"
                            strokeWidth={contourLineWidth}
                        />

                        <Arrow
                            key={index}
                            lineWidth={lineWidth}   // Используем переданную ширину линии
                            endWidth={arrowEndWidth} // Используем переданную ширину наконечника
                            x0={x0}
                            y0={y0}
                            x1={x1}
                            y1={y1}
                        />
                    </>

                );
            })}
        </>
    );
};

export default Graph;