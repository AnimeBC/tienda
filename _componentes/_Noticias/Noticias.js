import { useState, useEffect, useRef } from "react";
import estilos from "./noticias.module.css";
import datos from "../../app/noticias.json";

export default function Noticias({ idiomaSeleccionado }) {
  const noticias = datos.idiomas.find((idioma) => idioma[idiomaSeleccionado])[
    idiomaSeleccionado
  ];
  const items = noticias.slice(0, -1).map((noticia, index) => {
    const key = Object.keys(noticia)[0];
    return {
      ...noticia[key],
      key: index,
    };
  });

  const [posicion, setPosicion] = useState(0);
  const [posicionA, setPosicionA] = useState(4);
  const carruselRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [posicion, posicionA]);

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
      setTimeout(() => {
        carruselRef.current.style.transform = `translateX(-${
          newPosition * (23 + 1)
        }%)`;
      }, 0);
    } else {
      setPosicion(items.length - 4);
      setPosicionA(items.length);
      setTimeout(() => {
        carruselRef.current.style.transform = `translateX(-${
          (items.length - 4) * (23 + 1)
        }%)`;
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
        carruselRef.current.style.transform = `translateX(-${
          newPosition * (23 + 1)
        }%)`;
      }, 0);
    } else {
      setPosicion(0);
      setPosicionA(4);
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
        <div className={estilos.tituloA}>
          <h1>Noticias</h1>
        </div>
      </div>
      <div
        className={estilos.carrusel_container}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCarruselClick}
      >
        <button
          className={`${estilos.arrow} ${estilos.arrow_left}`}
          onClick={() => {
            clickIzquierdo();
            resetInterval();
          }}
        >
          &#9664;
        </button>
        <div className={estilos.carrusel} ref={carruselRef}>
          {items.slice(posicion, posicionA).map((item, index) => (
            <div key={index} className={estilos.targeta}>
              <img src={item.imagen_url} alt={item.titulo} />
              <h3>{item.titulo}</h3>
              <button>{item.descripcion}</button>
            </div>
          ))}
        </div>
        <button
          className={`${estilos.arrow} ${estilos.arrow_right}`}
          onClick={() => {
            clickDerecho();
            resetInterval();
          }}
        >
          &#9654;
        </button>
      </div>
    </div>
  );
}
