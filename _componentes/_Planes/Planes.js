import estilos from "./planes.module.css";
import { useState } from "react";
import imagenes from "../../app/imagenes.json";
import Imagenes from "../_imagenes/Imagenes";

export default function Planes({
  datos,
  FidiomaSeleccionado,
  idiomaSeleccionado,
  Fseleccion,
  seleccion,
}) {
  const listaDeOpciones=Object.keys(datos[idiomaSeleccionado])
  const [capturaDeEleccion,FcapturaDeEleccion]=useState(listaDeOpciones[0])
  const [contenidoElegido,FcontenidoElegido] = useState(Object.entries(datos[idiomaSeleccionado][capturaDeEleccion]))
  function cambiarOpcion(a){
    FcapturaDeEleccion(String(a))
  }
  console.log(contenidoElegido);
  return (
    <div className={estilos.todo}>
      <div className={estilos.elegir}>
        {listaDeOpciones.map((a, b) => (
          <div key={b} className={estilos.eleccion} onClick={()=>cambiarOpcion(a)}>
            {a}
          </div>
        ))}
      </div>
      <div className={estilos.contenido}>
      {contenidoElegido.map(([key, value]) => (
          <div key={key} className={estilos.item}>
            <h3>{value.nombre}</h3>
            <p>{value.descripcion}</p>
            <p>Beneficios: {value.beneficios}</p>
            <p>Precio: ${value.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
