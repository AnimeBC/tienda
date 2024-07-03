"use client";
import estilos from "./barra.module.css";
import { useState } from "react";
export default function Barra({ datos }) {
  const [idiomaSeleccionado, setIdiomaSeleccionado] = useState("español");
  const datosIdioma = datos["idiomas"].find(
    (item) => Object.keys(item)[0] === idiomaSeleccionado
  )[idiomaSeleccionado];
  return (
    <div className={estilos.todo}>
      <div className={estilos.logo}>BITEL</div>
      <div className={estilos.navegacion}>
        <nav className={estilos.navegacionA}>
          <ul>
            <li>{datosIdioma.accesorios}</li>
            <li>{datosIdioma.planes}</li>
            <li>{datosIdioma.ofertas}</li>
            <li>{datosIdioma.idioma}</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
