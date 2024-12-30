"use client"

import React from 'react';

interface TableroProps {
    width: number;
    height: number;
}

class Circulo {
    x: number
    y: number
    radio: number
    imagen: string

    constructor(x: number, y: number, radio: number, imagen: string) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.imagen = imagen;
    }
}

const circleSizeMin = 40;
const circleSizeMedio = 50;
const circleSizeMax = 60;

const imagenes = [ "ciervo", "cocodrilo", "elefante", "leon", "obeja", "obeja2", "oso", "perro", "perro2", "tigre", "tortuga" ];

function calcularPosicionNuevoCiruclo(circuloInicio: Circulo, circuloFin: Circulo, angulo: number) : Circulo {   
    const anguloRadianes = angulo * (Math.PI / 180);
    const hipotenusa = circuloInicio.radio + circuloFin.radio;
    const catetoAdyacente = hipotenusa * Math.cos(anguloRadianes);
    const catetoOpuesto = hipotenusa * Math.sin(anguloRadianes);

    return {
        x: circuloInicio.x + catetoAdyacente,
        y: circuloInicio.y - catetoOpuesto,
        radio: circuloFin.radio,
        imagen: circuloFin.imagen,
    }
}

function calcularAngulo(circuloInicio: Circulo, circuloFin: Circulo, circuloAnterior: Circulo) : number {
    const a = circuloFin.radio + circuloAnterior.radio;
    const b = circuloInicio.radio + circuloFin.radio;
    const c = circuloInicio.radio + circuloAnterior.radio;

    console.log(a, b, c);

    const angulo = Math.acos(-((Math.pow(a, 2) - Math.pow(b, 2) - Math.pow(c, 2)) / (2 * b * c)));
    
    return (angulo * (180 / Math.PI));
}

export const Tablero:  React.FC<TableroProps>  = ({ width, height} ) : React.JSX.Element=> {
    
    const listaCirculos = [];
    
    const circles: Circulo[] = [];

    circles.push({
        x: width / 2,
        y: height / 2,
        radio: circleSizeMedio,
        imagen: imagenes[0],
    });

    const anguloMax = (Math.atan(circleSizeMax / (circleSizeMax + circleSizeMin)) * 180 / Math.PI) * 2;
    const anguloMin = (Math.atan(circleSizeMin / (circleSizeMax + circleSizeMin)) * 180 / Math.PI) * 2;

    console.log("anguloMax", anguloMax);
    console.log("anguloMin", anguloMin);

    let anguloActual = 0;
    let totalAngulo = 0;
    let numCirculos = 0;

    const circuloActual: Circulo = circles[0];

    const anguloPrimero = 90;


    while (360 - totalAngulo > anguloMin) {
        const circuloFin: Circulo = {
            x: 0,
            y: 0,
            radio: circleSizeMedio,
            imagen: imagenes[Math.floor(Math.random() * imagenes.length)],
        };
       
        if (numCirculos === 0) {
            
            
            circles.push(calcularPosicionNuevoCiruclo(circuloActual, circuloFin, anguloPrimero));

            totalAngulo = (Math.atan(circuloFin.radio / (circuloFin.radio + circuloActual.radio)) * 180 / Math.PI) * 2;
            console.log(numCirculos, anguloPrimero, anguloActual, totalAngulo);
        } else {
            let anguloSiguiente = calcularAngulo(circuloActual, circuloFin, circles[numCirculos]);
            
            if (360 - anguloActual < anguloMin) {
                //anguloSiguiente = 360 - anguloActual;

                //circuloFin.radio = 
            }
            
            anguloActual += anguloSiguiente;
            totalAngulo += anguloSiguiente;
           
            console.log(numCirculos, anguloSiguiente, anguloActual, totalAngulo);

            circles.push(calcularPosicionNuevoCiruclo(circuloActual, circuloFin, anguloActual + anguloPrimero)); 
        }
        numCirculos++;

    }

    return (
        <svg width={width} height={height}>
            <rect x={0} y={0} width={width} height={height} fill="white" />
            {circles.map((circle, i) => (
                <g key={i}>
                    <circle cx={circle.x} cy={circle.y} r={circle.radio} fill="white" />
                    <image
                        x={circle.x - circle.radio * 0.8}
                        y={circle.y - circle.radio * 0.8}
                        width={circle.radio * 2 * 0.8}
                        height={circle.radio * 2 * 0.8}
                        href={`/img/${circle.imagen}.png`}
                        transform={`rotate(${Math.random() * 360} ${circle.x} ${circle.y})`}
                    />
                </g>
            ))}
        </svg>
    );

  
  
};

