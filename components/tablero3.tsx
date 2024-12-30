// Crear un Masonry grid que ocupe todo el anchos de la pantalla y alto de la pantalla
// los div del bento son cuadrados y tienen un tamaño aleatorio entre un minimum y un maximum
// los cuadrados deben rellenar lo maxomo de la pantalla sin pasarse
// los estilos se deben hacer con TailwindCSS

"use client"

import React from 'react';


export const Tablero  = () : React.JSX.Element=> {

    const ladoCuadradoMin = 40;
    const ladoCuadradoMax = 60;
    const cuadrados = [];
    const cuadradoCount = 16;
    for (let i = 0; i < cuadradoCount; i++) {
        const ladoCuadrado = Math.random() * (ladoCuadradoMax - ladoCuadradoMin) + ladoCuadradoMin;
        cuadrados.push(ladoCuadrado);
    }

    return (
        <div className="grid grid-cols-4 gap-4 h-screen w-screen">
            {cuadrados.map((ladoCuadrado, i) => (
                <div key={i} className="bg-gray-300 flex items-center justify-center">
                    <div className="bg-white" style={{ width: ladoCuadrado, height: ladoCuadrado }}></div>
                </div>
            ))}
        </div>
    );
    
}