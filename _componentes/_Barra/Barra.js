"use client";
import estilos from "./barra.module.css";
import { useState } from "react";
import Link from "next/link";
export default function Barra({ datos,FidiomaSeleccionado,idiomaSeleccionado,Fseleccion,seleccion}) {
  const [mostrar, Fmostrar] = useState(0);
  const [iconoActivo, setIconoActivo] = useState(null);
  const datosIdioma = datos["idiomas"].find(
    (item) => Object.keys(item)[0] === idiomaSeleccionado
  )[idiomaSeleccionado];
  function cambiarIcono(a, valor) {
    Fmostrar(valor);
    setIconoActivo(valor);
  }
  function resetIcono() {
    Fmostrar(0);
    setIconoActivo(null);
  }
  const nombresIdiomas = datos["idiomas"].map((obj) => Object.keys(obj)[0]);
  return (
    <div className={estilos.todo}>
      <div className={estilos.logo}>BITEL</div>
      <div className={estilos.navegacion}>
        <nav className={estilos.navegacionA}>
          <ul className={estilos.navegacionul}>
            <li
              onMouseEnter={(a) => cambiarIcono(a, 1)}
              onMouseLeave={resetIcono}
            >
              {datosIdioma.accesorios}
              <ion-icon
                name={
                  iconoActivo === 1 ? "caret-up-outline" : "caret-down-outline"
                }
              ></ion-icon>
              {mostrar === 1 && (
                <div className={estilos.flotante}>
                  <div>ejemplo 1</div>
                  <div>ejemplo 1</div>
                </div>
              )}
            </li>
            <li
              onMouseEnter={(a) => cambiarIcono(a, 2)}
              onMouseLeave={resetIcono}
            >
              {datosIdioma.planes}
              <ion-icon
                name={
                  iconoActivo === 2 ? "caret-up-outline" : "caret-down-outline"
                }
              ></ion-icon>
              {mostrar === 2 && (
                <div className={estilos.flotante}>
                  <div>ejemplo 2</div>
                  <div>ejemplo 2</div>
                </div>
              )}
            </li>
            <li
              onMouseEnter={(a) => cambiarIcono(a, 3)}
              onMouseLeave={resetIcono}
            >
              {datosIdioma.ofertas}
              <ion-icon
                name={
                  iconoActivo === 3 ? "caret-up-outline" : "caret-down-outline"
                }
              ></ion-icon>
              {mostrar === 3 && (
                <div className={estilos.flotante}>
                  <div>ejemplo 3</div>
                  <div>ejemplo 3</div>
                  <div>ejemplo 3</div>
                  <div>ejemplo 3</div>
                  <div>ejemplo 3</div>
                  <div>ejemplo 3</div>
                  <div>ejemplo 3</div>
                  <div>ejemplo 3</div>
                </div>
              )}
            </li>
            <li
              onMouseEnter={(a) => cambiarIcono(a, 4)}
              onMouseLeave={resetIcono}
            >
              {datosIdioma.idioma}
              <ion-icon
                name={
                  iconoActivo === 4 ? "caret-up-outline" : "caret-down-outline"
                }
              ></ion-icon>
              {mostrar === 4 && (
                <div className={estilos.flotante}>
                  <div className={estilos.flotanteA}>
                    <ul className={estilos.flotanteulZ}>
                      {nombresIdiomas.map((nombre, index) => (
                        <li key={index} className={estilos.flotanteulliZ}>
                          <Link href={`#${nombre}`} onClick={()=>{FidiomaSeleccionado(nombre);Fmostrar(0);}}>{nombre}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
