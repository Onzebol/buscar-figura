// Componente que muestra el tablero del juego, donde:
// - Se pasan las dimensiones del tablero
// - Se generan circulos dentro de la pantalla
// - El tablero se divide en filas y columnas, las filas son para el lado corto y las columans para el lado largo
// - Los circulos deben estar dentro de cada celda, indicada por las filas y columnas
// - Los cirtuculos deben tener un tamaño aleatorio entre un minimo y un maximo

"use client"

import React from 'react';

interface TableroProps {
    width: number;
    height: number;
}

export const Tablero:  React.FC<TableroProps>  = ({ width, height} ) : React.JSX.Element=> {

    const circles = [];

    const vertical = height > width;
    
    const filas = 3;
    const columnas = 6;
    const circleCount = filas * columnas;
    const cellWidth = vertical ? width / filas : width / columnas;
    const cellHeight = vertical ? height / columnas : height / filas;
    const circleSizeMax = cellWidth > cellHeight ? cellHeight / 2 : cellWidth / 2;
    const circleSizeMin = circleSizeMax * 0.7;
    for (let i = 0; i < circleCount; i++) {
        const row = vertical ? Math.floor(i / filas) : Math.floor(i / columnas);
        const col = vertical ? i % filas : i % columnas;
        const circle = {
            x: col * cellWidth + cellWidth / 2,
            y: row * cellHeight + cellHeight / 2,
            size: Math.random() * (circleSizeMax - circleSizeMin) + circleSizeMin,
        };
        circles.push(circle);
    }



    return (
        <svg width={width} height={height}>
            <rect x={0} y={0} width={width} height={height} fill="red" />
            {circles.map((circle, i) => (
                <g key={i}>
                    <circle cx={circle.x} cy={circle.y} r={circle.size} fill="white" />
                </g>
            ))}
        </svg>
    );
}
