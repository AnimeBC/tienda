import { useState, useEffect, useRef } from 'react';
import estilos from "./servicios.module.css";
import Imagenes from '../_imagenes/Imagenes';

export default function Servicios() {
    const items = [
        { src: "imagen1.png", title: "Equipos", description: "Me interesa" },
        { src: "imagen1.jpg", title: "Accesorios", description: "Me interesa" },
        { src: "imagen1.png", title: "Planes Postpago - Delivery", description: "Me interesa" },
        { src: "imagen1.jpg", title: "Consultas", description: "Me interesa" }
    ];
    const [posicion, setPosicion] = useState(0);
    const [posicionA, setPosicionA] = useState(3);
    const carruselRef = useRef(null);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        startInterval();
        return () => clearInterval(intervalRef.current);
    }, [posicion,posicionA]);

    const startInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            clickDerecho();
        }, 3000);
    };

    const stopInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const resetInterval = () => {
        stopInterval();
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            startInterval();
        }, 3000);
    };

    const clickIzquierdo = () => {
        if (posicion > 0) {
            const newPosition = posicion - 1;
            const newPositionA = posicionA - 1;
            setPosicion(newPosition);
            setPosicionA(newPositionA);
            // Usar setTimeout para asegurar que la transición CSS se active correctamente
            setTimeout(() => {
                carruselRef.current.style.transform = `translateX(-${newPosition * (33.33 + 0.3)}%)`; // Ajustar según el tamaño de cada tarjeta
            }, 0);
        } else {
            setPosicion(items.length - 3);
            setPosicionA(items.length);
            setTimeout(() => {
                carruselRef.current.style.transform = `translateX(-${(items.length - 3) * (33.33 + 0.3)}%)`; // Ajustar según el tamaño de cada tarjeta
            }, 0);
        }
    };

    const clickDerecho = () => {
        if (posicionA < items.length) {
            const newPosition = posicion + 1;
            const newPositionA = posicionA + 1;
            setPosicion(newPosition);
            setPosicionA(newPositionA);
            setTimeout(() => {
                carruselRef.current.style.transform = `translateX(-${newPosition * (33.33 + 0.3)}%)`; // Ajustar según el tamaño de cada tarjeta
            }, 0);
        } else {
            setPosicion(0);
            setPosicionA(3);
            setTimeout(() => {
                carruselRef.current.style.transform = `translateX(0)`;
            }, 0);
        }
    };

    const handleMouseEnter = () => {
        stopInterval();
    };

    const handleMouseLeave = () => {
        resetInterval();
    };

    const handleCarruselClick = () => {
        stopInterval();
        resetInterval();
    };

    return (
        <div className={estilos.todo}>
            <div className={estilos.titulo}>
                <h1>Servicios</h1>
            </div>
            <div
                className={estilos.carrusel_container}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleCarruselClick}
            >
                <button className={`${estilos.arrow} ${estilos.arrow_left}`} onClick={() => { clickIzquierdo(); resetInterval(); }}>&#9664;</button>
                <div className={estilos.carrusel} ref={carruselRef}>
                    {items.slice(posicion, posicionA).map((a, b) => (
                        <div key={b} className={estilos.targeta}>
                            <Imagenes url={`${a.src}`} alt={a.title} onContextMenu={(e) => e.preventDefault()} />
                            <h3>{a.title}</h3>
                            <button>{a.description}</button>
                            <div className={estilos.opacidad}><ion-icon name="expand-outline"></ion-icon></div>
                        </div>
                    ))}
                </div>
                <button className={`${estilos.arrow} ${estilos.arrow_right}`} onClick={() => { clickDerecho(); resetInterval(); }}>&#9654;</button>
            </div>
        </div>
    );
}
