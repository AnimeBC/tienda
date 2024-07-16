import estilos from "./planes.module.css";
import { useState, useRef } from "react";
import imagenes from "../../app/imagenes.json";
import Imagenes from "../_imagenes/Imagenes";

export default function Planes({
  datos,
  FidiomaSeleccionado,
  idiomaSeleccionado,
  Fseleccion,
  seleccion,
}) {
  const listaDeOpciones = Object.keys(datos[idiomaSeleccionado]);
  const [capturaDeEleccion, FcapturaDeEleccion] = useState(listaDeOpciones[0]);
  const [contenidoElegido, FcontenidoElegido] = useState(Object.entries(datos[idiomaSeleccionado][capturaDeEleccion]));

  function cambiarOpcion(a) {
    FcapturaDeEleccion(String(a));
    FcontenidoElegido(Object.entries(datos[idiomaSeleccionado][capturaDeEleccion]));
  }

  const carouselRef = useRef(null);
  let isDragging = false;
  let startPosition = 0;
  let startScrollLeft = 0;
  let animationFrameId;

  const handleMouseDown = (event) => {
    if (contenidoElegido.length === 0) return;
    isDragging = true;
    startPosition = getPositionX(event);
    startScrollLeft = carouselRef.current.scrollLeft;
    carouselRef.current.style.cursor = "grabbing";
    cancelAnimationFrame(animationFrameId);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    const distance = currentPosition - startPosition;
    carouselRef.current.scrollLeft = startScrollLeft - distance;
  };

  const handleMouseUp = () => {
    isDragging = false;
    carouselRef.current.style.cursor = "grab";
    smoothScroll();
  };

  const smoothScroll = () => {
    const scrollLeft = carouselRef.current.scrollLeft;
    const targetScrollLeft = Math.round(scrollLeft / 300) * 300; // Ajusta el valor 300 según el tamaño de tus elementos
    const distance = targetScrollLeft - scrollLeft;
    const duration = 300; // Duración de la animación en ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutQuad(progress);
      carouselRef.current.scrollLeft = scrollLeft + distance * easeProgress;
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
  };

  const easeOutQuad = (t) => t * (2 - t);

  const getPositionX = (event) => event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;

  return (
    <div className={estilos.todo}>
      <div className={estilos.elegir}>
        {listaDeOpciones.map((a, b) => (
          <div
            key={b}
            className={`${estilos.eleccion} ${capturaDeEleccion === a ? estilos.seleccionado : ''}`}
            onClick={() => cambiarOpcion(a)}
          >
            {a}
          </div>
        ))}
      </div>
      <div
        className={estilos.contenido}
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {contenidoElegido.length > 0 ? (
          contenidoElegido.map(([a, b]) => (
            <div key={a} className={estilos.contenidoA}>
              <h3>{b.nombre}</h3>
              <p>{b.descripcion}</p>
              <p>Beneficios: {b.beneficios}</p>
              <p>Precio: {b.precio}</p>
            </div>
          ))
        ) : (
          <p>No hay contenido para mostrar.</p>
        )}
      </div>
    </div>
  );
}
