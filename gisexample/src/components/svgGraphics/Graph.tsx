import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import Arrow from '../svgGraphics/Arrow';
import { useSelector, useDispatch } from 'react-redux';
import { UpdatePoints } from '../redux/actions'; // Импорт action
import { Point, State, UpdatePointsAction } from '../redux/types'; // Импорт action


interface GraphProps {
    arrowWidth?: number; // Ширина наконечника стрелки
    lineWidth?: number;       // Ширина линии стрелки
    updateSpeed?: number;     // Скорость обновления (в миллисекундах)
    arrowNumb?: number;
    isPlaying?: boolean; // Флаг, определяющий, запущена ли анимация
    animLen?: number;
    data?: number[][][];
    contourLineWidth?: number;
    isLogSize?: boolean;
}


const initialArrowNumb: number = 20;
const initialArrowWidth: number = 1.4;
const initialLineWidth: number = 0.7;
const initialCountourLineWidth: number = 1;
const initialAnimLenght: number = 2000;
const initialAnimSpeed: number = 20;

const Graph: React.FC<GraphProps> = ({
    arrowWidth = 1.4, // Значение по умолчанию
    lineWidth = 0.7,      // Значение по умолчанию
    updateSpeed = 20, // Значение по умолчанию 1000 мс
    arrowNumb = 20,
    isPlaying = false,
    animLen = 2000,
    contourLineWidth = 1,
    isLogSize = false
}) => {


    const [currentData, setCurrentData] = useState([[0, 0], [0, 0]]); // Начальное состояние - данные из нулевого момента времени

    const data = useSelector((state: State) => state.points);
    const isLineCompleted = useSelector((state: State) => state.isLineCompleted);



    if (data != undefined){
        if (arrowNumb >= data[0].length - 1){
            arrowNumb = data[0].length - 2;
        }
        if (animLen >= data.length){
            animLen = data.length;
        }
    }


    // [[[0, 0], [200, 400], [200, 400]], [[0, 0], [700, 4210], [230, 440]], [[0, 40], [20, 100], [220, 300]]]

    let contourPoints: string = '';
    const [greenContourPoints, setGreenPoints] = useState<string>('0,0 200,200');

    let points: number[][] = [];
    let startArrows: number[][] = [];
    let startArrowsStr: string = '';


    if (arrowNumb - 1 < 0){
        points = data == undefined ? [[0, 0], [0, 0]] : data.map(innerArray => innerArray[1]);
        contourPoints = points.map(point => point.join(',')).join(' ');


        startArrows = data == undefined ? [[0, 0], [0, 0]] : data[0];
        startArrowsStr = startArrows.map(point => point.join(',')).join(' ');
    }
    else {
        points = data == undefined ? [[0, 0], [0, 0]] : data.map(innerArray => innerArray[arrowNumb - 1]);
        contourPoints = points.map(point => point.join(',')).join(' ');


        startArrows = data == undefined ? [[0, 0], [0, 0]] : data[0];
        startArrowsStr = startArrows.map(point => point.join(',')).join(' ');
    }

    const [delArrowStart, setDelArrowStart] = useState(false);
    const svgRef = useRef<SVGSVGElement>(null);
    const [currentDataIndex, setCurrentDataIndex] = useState(0);
    const [animationInterval, setAnimationInterval] = useState<NodeJS.Timer | null>(null); // Храним интервал анимации

    useEffect(() => {
        if (arrowNumb - 1 < 0){}
        else{
            let greenpoints = data == undefined ? [[0, 0], [0, 0]] : data.slice(0, currentDataIndex + 1) .map(innerArray => innerArray[arrowNumb - 1]);
            
            setGreenPoints(greenpoints.map(point => point.join(',')).join(' '));


        }

        // setGreenPoints(greenContourPoints + ' ' + data[currentDataIndex][arrowNumb - 1][0] + ',' + data[currentDataIndex][arrowNumb - 1][1]);
    }, [currentDataIndex]);

    useEffect(() => {
        // Функция для запуска анимации
        const startAnimation = () => {
            const svg = d3.select(svgRef.current);
            const totalFrames = animLen;

            const interval = setInterval(() => {
                setCurrentDataIndex(prevIndex => {
                    const newIndex = (prevIndex + 1) % totalFrames; // Зацикливаем индекс
                    data == undefined ? setCurrentData([[0, 0], [0, 0]]) : setCurrentData(data[newIndex]); // Обновляем currentData
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
            setDelArrowStart(true);
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

            {isLineCompleted ? <polyline
                points={contourPoints}
                fill="none"
                stroke="#b3c213"
                strokeWidth={contourLineWidth}
            />
                :
            <polyline
                points={greenContourPoints}
                fill="none"
                stroke="green"
                strokeWidth={contourLineWidth}
            />}

            {/* Отрисовка начального положения стрелок */}
            {!delArrowStart && startArrows.slice(0, arrowNumb).map((arrow, index) => {
                let x0 = arrow[0];
                let y0 = arrow[1];
                let x1 = arrow[0];
                let y1 = arrow[1];

                if (index > 0) {
                    x0 = startArrows[index - 1][0];
                    y0 = startArrows[index - 1][1];
                }

                return (

                    <>
                        <Arrow
                            key={index}
                            lineWidth={
                                isLogSize ? 
                                Math.pow((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0), 0.5) / (100 / arrowWidth)
                                : 
                                lineWidth
                                
                            }   // Используем переданную ширину линии

                            endWidth={
                                isLogSize ? 
                                Math.pow((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0), 0.5) / (10 / arrowWidth)
                                : 
                                arrowWidth
                            } // Используем переданную ширину наконечника

                            x0={x0}
                            y0={y0}
                            x1={x1}
                            y1={y1}
                        />
                    </>
                );
            })}



            {/* Отрисовка стрелок из currentData, исключая, хотя вроде не исключая последние две стрелки */}
            {currentData.slice(0, arrowNumb).map((arrow, index) => {
                let x0 = arrow[0];
                let y0 = arrow[1];
                let x1 = arrow[0];
                let y1 = arrow[1];

                if (index > 0) {
                    x0 = currentData[index - 1][0];
                    y0 = currentData[index - 1][1];
                }

                return (

                    <>
                        <Arrow
                            key={index}
                            lineWidth={
                                isLogSize ? 
                                Math.pow((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0), 0.5) / (100 / arrowWidth)
                                : 
                                lineWidth
                                
                            }   // Используем переданную ширину линии

                            endWidth={
                                isLogSize ? 
                                Math.pow((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0), 0.5) / (10 / arrowWidth)
                                : 
                                arrowWidth
                            } // Используем переданную ширину наконечника
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