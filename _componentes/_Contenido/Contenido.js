import { useState, useEffect, useRef } from "react";
import estilos from "./contenido.module.css";
import datos from "../../app/imagenes.json"; // Asegúrate de que este archivo contenga el JSON proporcionado
import Imagenes from "../_imagenes/Imagenes";
import Link from "next/link";
export default function Contenido() {
  const claves = Object.keys(datos.datos);
  const clavesOrdenadas = claves.sort((a, b) => parseInt(a) - parseInt(b));
  const ordenInicial = [clavesOrdenadas[1], clavesOrdenadas[0]]; // Reordenar para empezar con la clave "2"
  const datosOrdenados = ordenInicial.map((clave) => datos.datos[clave]);
  const [indiceActual, setIndiceActual] = useState(0);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [indiceActual]);

  const startInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      siguienteImagen();
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

  const siguienteImagen = () => {
    setIndiceActual((indicePrevio) =>
      indicePrevio === datosOrdenados.length - 1 ? 0 : indicePrevio + 1
    );
  };

  const anteriorImagen = () => {
    setIndiceActual((indicePrevio) =>
      indicePrevio === 0 ? datosOrdenados.length - 1 : indicePrevio - 1
    );
  };

  const handleMouseEnter = () => {
    stopInterval();
  };

  const handleMouseLeave = () => {
    resetInterval();
  };

  const handleButtonClick = () => {
    stopInterval();
    resetInterval();
  };
  const tieneTitulo = datosOrdenados[indiceActual].titulo;
  return (
    <div className={estilos.todo}>
      <div className={estilos.cambio}>
        <div
          className={estilos.imagenContenedor}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Imagenes url={datosOrdenados[indiceActual].imagen} />
          {tieneTitulo !== undefined ? (
            <div className={estilos.contenidoExtra}>
              <div className={estilos.titulo}>
                {datosOrdenados[indiceActual].titulo}
              </div>
              <div className={estilos.descripcion}>
                {datosOrdenados[indiceActual].descripcion}
              </div>
                <div className={estilos.opcion}>
                <Link
                href={datosOrdenados[indiceActual].link}
                
              >
                {datosOrdenados[indiceActual].opcion}
              </Link>
                </div>
            </div>
          ) : (
            <div className={estilos.contenidoExtraA}>
              <div className={estilos.opcionA}>
                <Link href={datosOrdenados[indiceActual].link}>Ver mas</Link>
              </div>
            </div>
          )}
        </div>
        <div className={estilos.controles}>
          <button
            onClick={() => {
              anteriorImagen();
              handleButtonClick();
            }}
            className={estilos.anterior}
          >
            &#10094;
          </button>
          <button
            onClick={() => {
              siguienteImagen();
              handleButtonClick();
            }}
            className={estilos.siguiente}
          >
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
}
