import React from 'react';


interface SvgCrossProps {
    xx: number;
    yy: number;
    svgWidth: number; 
    svgHeight: number;
    scale: number; 
};
  
  
const SvgCross: React.FC<SvgCrossProps> = ({
        xx,
        yy,
        svgWidth,
        svgHeight,
        scale,
    }) => {

    let position = {x: xx, y: yy};
    return(
        <>



          {/* <line 
            x1={position.x + svgWidth * scale / 2 - 10 * scale} 
            y1={position.y + svgHeight * scale / 2} 
            x2={position.x + svgWidth * scale / 2 + 10 * scale} 
            y2={position.y + svgHeight * scale / 2} 
            stroke="#101010" 
            strokeWidth={5 * scale}
          />
          <line 
            x1={position.x + svgWidth * scale / 2} 
            y1={position.y + svgHeight * scale / 2 + 10 * scale} 
            x2={position.x + svgWidth * scale / 2} 
            y2={position.y + svgHeight * scale / 2 - 10 * scale} 
            stroke="#101010" 
            strokeWidth={5 * scale}
          />         */}

            <line 
                x1={position.x + svgWidth * scale / 2 - 9 * scale} 
                y1={position.y + svgHeight * scale / 2} 
                x2={position.x + svgWidth * scale / 2 + 9 * scale} 
                y2={position.y + svgHeight * scale / 2} 
                stroke="grey" 
                strokeWidth={3 * scale}
                strokeOpacity="1.0"
            />

            <line 
                x1={position.x + svgWidth * scale / 2} 
                y1={position.y + svgHeight * scale / 2 + 9 * scale} 
                x2={position.x + svgWidth * scale / 2} 
                y2={position.y + svgHeight * scale / 2 + 1.5 * scale} 
                stroke="grey" 
                strokeWidth={3 * scale}
                strokeOpacity="1.0"
            />   

            <line 
                x1={position.x + svgWidth * scale / 2} 
                y1={position.y + svgHeight * scale / 2 - 1.5 * scale} 
                x2={position.x + svgWidth * scale / 2} 
                y2={position.y + svgHeight * scale / 2 - 9 * scale} 
                stroke="grey" 
                strokeWidth={3 * scale}
                strokeOpacity="1.0"
            />      



            
          {/* <circle r={5 * scale} cx={position.x} cy={position.y} fill="red" /> */}
          {/* <circle r={5 * scale} cx={maxX} cy={minY} fill="grey" />
          <circle r={5 * scale} cx={minX} cy={maxY} fill="grey" />
          <circle r={5 * scale} cx={minX} cy={minY} fill="grey" />
          <circle r={5 * scale} cx={maxX} cy={maxY} fill="grey" />
          */}
          {/* <circle 
            r={7 * scale} 
            cx={minX + (maxX - minX) / 2} 
            cy={minY + (maxY - minY) / 2} 
            fill="purple" 
          />
          <circle 
            r={5 * scale} 
            cx={minX + (maxX - minX) / 2} 
            cy={minY + (maxY - minY) / 2} 
            fill="black" 
          /> */}
        </>
    );
};


export default SvgCross;