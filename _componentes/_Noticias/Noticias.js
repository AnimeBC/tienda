import { useState, useEffect, useRef } from "react";
import estilos from "./noticias.module.css";
import datos from "../../app/noticias.json";
import Imagenes from "../_imagenes/Imagenes";

export default function Noticias({ idiomaSeleccionado }) {
  const noticias = datos.idiomas.find((idioma) => idioma[idiomaSeleccionado])[idiomaSeleccionado];
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
  const intervaloRef = useRef(null);
  const tiempoRef = useRef(null);

  useEffect(() => {
    iniciarIntervalo();
    return () => clearInterval(intervaloRef.current);
  }, [posicion, posicionA]);

  const iniciarIntervalo = () => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
    }
    intervaloRef.current = setInterval(() => {
      clickDerecho();
    }, 3000);
  };

  const detenerIntervalo = () => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
    }
  };

  const reiniciarIntervalo = () => {
    detenerIntervalo();
    if (tiempoRef.current) {
      clearTimeout(tiempoRef.current);
    }
    tiempoRef.current = setTimeout(() => {
      iniciarIntervalo();
    }, 3000);
  };

  const clickIzquierdo = () => {
    if (posicion > 0) {
      const nuevaPosicion = posicion - 1;
      const nuevaPosicionA = posicionA - 1;
      setPosicion(nuevaPosicion);
      setPosicionA(nuevaPosicionA);
      setTimeout(() => {
        carruselRef.current.style.transform = `translateX(-${nuevaPosicion * (23 + 1)}%)`;
      }, 0);
    } else {
      setPosicion(items.length - 4);
      setPosicionA(items.length);
      setTimeout(() => {
        carruselRef.current.style.transform = `translateX(-${(items.length - 4) * (23 + 1)}%)`;
      }, 0);
    }
  };

  const clickDerecho = () => {
    if (posicionA < items.length) {
      const nuevaPosicion = posicion + 1;
      const nuevaPosicionA = posicionA + 1;
      setPosicion(nuevaPosicion);
      setPosicionA(nuevaPosicionA);
      setTimeout(() => {
        carruselRef.current.style.transform = `translateX(-${nuevaPosicion * (23 + 1)}%)`;
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
    detenerIntervalo();
  };

  const handleMouseLeave = () => {
    reiniciarIntervalo();
  };

  const handleCarruselClick = () => {
    detenerIntervalo();
    reiniciarIntervalo();
  };

  return (
    <div className={estilos.todo}>
      <div className={estilos.titulo}>
        <div className={estilos.tituloA}>
          <h1>Noticias</h1>
        </div>
      </div>
      <div
        className={estilos.carrusel_contenedor}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCarruselClick}
      >
        {posicion > 0 && (
          <button
            className={`${estilos.flecha} ${estilos.flecha_izquierda}`}
            onClick={() => {
              clickIzquierdo();
              reiniciarIntervalo();
            }}
          >
            &#9664;
          </button>
        )}
        <div className={estilos.carrusel} ref={carruselRef}>
          {items.slice(posicion, posicionA).map((a, index) => (
            <div key={index} className={estilos.tarjeta}>
              <div className={estilos.imagenContenedor}>
                <Imagenes url={a.imagen_url} alt={a.titulo} />
              </div>
              <h3>{a.titulo}</h3>
              <button>{a.descripcion}</button>
            </div>
          ))}
        </div>
        {posicionA < items.length && (
          <button
            className={`${estilos.flecha} ${estilos.flecha_derecha}`}
            onClick={() => {
              clickDerecho();
              reiniciarIntervalo();
            }}
          >
            &#9654;
          </button>
        )}
      </div>
    </div>
  );
}
