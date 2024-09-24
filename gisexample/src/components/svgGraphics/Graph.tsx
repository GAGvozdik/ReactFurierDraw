import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import Arrow from '../svgGraphics/Arrow';
import { useSelector, useDispatch } from 'react-redux';
import { UpdatePoints } from '../redux/actions';
import { Point, State, UpdatePointsAction } from '../redux/types';


const Graph: React.FC = ({}) => {

    const [currentData, setCurrentData] = useState([[0, 0], [0, 0]]); 

    let data = useSelector((state: State) => state.points);
    let isLineCompleted = useSelector((state: State) => state.isLineCompleted);
    let arrowWidth = useSelector((state: State) => state.arrowWidth);
    let lineWidth = useSelector((state: State) => state.lineWidth);
    let updateSpeed = useSelector((state: State) => state.updateSpeed);
    let arrowNumb = useSelector((state: State) => state.arrowNumb);
    let isPlaying = useSelector((state: State) => state.isPlaying);
    let animLen = useSelector((state: State) => state.animLen);
    let contourLineWidth = useSelector((state: State) => state.contourLineWidth);
    
    // TODO add feachure
    let isLogSize = true;


    if (data != undefined){
        if (arrowNumb >= data[0].length - 1){
            arrowNumb = data[0].length - 2;
        }
        if (animLen >= data.length){
            animLen = data.length;
        }
    }

    let contourPoints: string = '';
    const [greenContourPoints, setGreenPoints] = useState<string>('');

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

            // TODO rename greenpoints
            let greenpoints = data == undefined ? [[0, 0], [0, 0]] : data.slice(0, currentDataIndex + 1) .map(innerArray => innerArray[arrowNumb - 1]);
            setGreenPoints(greenpoints.map(point => point.join(',')).join(' '));
        }
    }, [currentDataIndex]);

    const startAnimation = () => {
        const svg = d3.select(svgRef.current);
        const totalFrames = animLen;

        const interval = setInterval(() => {
            setCurrentDataIndex(prevIndex => {
                const newIndex = (prevIndex + 1) % totalFrames; // Зацикливаем индекс
                data == undefined ? setCurrentData([[0, 0], [0, 0]]) : setCurrentData(data[newIndex]);
                return newIndex;
            });

        }, updateSpeed);

        setAnimationInterval(interval);
    };

    // Функция для остановки анимации
    const stopAnimation = () => {
        if (animationInterval) {
            clearInterval(animationInterval);
            setAnimationInterval(null);
        }
    };

    useEffect(() => {
        if (isPlaying == true) {
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

    const [f, setF] = useState(0);
    useEffect(() => {
        setF(f + 1);
    }, [isPlaying]);


    return (
        <>
            {/* <text
                cx='200'
                cy='200'
                fill="white"
                stroke="#white"
            > 
                {isPlaying ? 'true' : 'false'} 
                {f}
            </text> */}

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
                stroke="#b3c213"
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