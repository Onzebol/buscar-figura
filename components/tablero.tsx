// Componente que contiene el tablero del juego, donde:
// - Se generan circulos dentro de la pantalla
// - Los circulos deben estar dentro de los margenes del rectangulo
// - Los circulos no deben estar superpuestos
// - Dentro del circulo se debe mostrar una imagen aleatoria
// - La imagen debe estar centrada en el circulo
// - Las imagenes deben estar en la carpeta public/img
// - Las imagenes deben tener una rotacion aleatoria
"use client"

import React from 'react';

interface TableroProps {
    width: number;
    height: number;
}

const imagenes = [ "ciervo", "cocodrilo", "elefante", "leon", "obeja", "obeja2", "oso", "perro", "perro2", "tigre", "tortuga" ];

export const Tablero:  React.FC<TableroProps>  = ({ width, height} ) : React.JSX.Element=> {
    
    const circles = [];
    const circleSizeMin = 40;
    const circleSizeMax = 60;
    const circleCount = Math.floor(((width * height) / (Math.PI * circleSizeMax * circleSizeMax)) * 0.7);
    console.log(circleCount);
    let intentos = 0;
    for (let i = 0; i < circleCount; i++) {
        const circle = {
            x: Math.random() * (width - circleSizeMax * 2) + circleSizeMax,
            y: Math.random() * (height - circleSizeMax * 2) + circleSizeMax,
            size: Math.random() * (circleSizeMax - circleSizeMin) + circleSizeMin,
            image: imagenes[Math.floor(Math.random() * imagenes.length)],
        };
        let overlapping = false;
        for (let j = 0; j < circles.length; j++) {
            const other = circles[j];
            const a = circle.size + other.size;
            const x = circle.x - other.x;
            const y = circle.y - other.y;

            if (a * a > x * x + y * y) {
                overlapping = true;
                break;
            }
        }
        if (overlapping) {
            i--;
            intentos++;
            if (intentos > 10000) {
                i++;
                console.log("No se pudo generar un circulo", i);
            }
            continue;
        }

      
      circles.push(circle);
    }

    return (
        <svg width={width} height={height}>
            <rect x={0} y={0} width={width} height={height} fill="white" />
            {circles.map((circle, i) => (
                <g key={i}>
                    <circle cx={circle.x} cy={circle.y} r={circle.size} fill="white" />
                    <image
                        x={circle.x - circle.size * 0.8}
                        y={circle.y - circle.size * 0.8}
                        width={circle.size * 2 * 0.8}
                        height={circle.size * 2 * 0.8}
                        href={`/img/${circle.image}.png`}
                        transform={`rotate(${Math.random() * 360} ${circle.x} ${circle.y})`}
                    />
                </g>
            ))}
        </svg>
    );

  
  
};

