import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import Arrow from './Arrow';
import data from '../data/data.json'; // Импортируйте ваш JSON файл

const Graph: React.FC = () => {

    const svgRef = useRef<SVGSVGElement>(null);

    const [currentData, setCurrentData] = useState(data[0]); // Начальное состояние - данные из нулевого момента времени

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        // Если необходимо, можно добавить обновление данных здесь

        return () => {
            // Остановите анимацию или другие эффекты, если они используются
        };
    }, [currentData]);

    return (
        <>
          
                {/* Отрисовка стрелок из currentData */}
                {currentData.map((arrow, index) => {
                    let x0 = 0;
                    let y0 = 0;
                    let x1 = arrow[0];
                    let y1 = arrow[1];

                    if (index > 0) {
                        x0 = currentData[index - 1][0];
                        y0 = currentData[index - 1][1];
                    }

                    return (
                        <Arrow
                            key={index}
                            lineWidth={5}
                            endWidth={20}
                            x0={x0}
                            y0={y0}
                            x1={x1}
                            y1={y1}
                        />
                    );
                })}

        </>
    );
};

export default Graph;
