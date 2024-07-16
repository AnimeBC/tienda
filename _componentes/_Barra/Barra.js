"use client";
import estilos from "./barra.module.css";
import { useState } from "react";
import Link from "next/link";
export default function Barra({ datos,FidiomaSeleccionado,idiomaSeleccionado,Fseleccion,seleccion}) {
  const [mostrar, Fmostrar] = useState(0);
  const [iconoActivo, FiconoActivo] = useState(null);
  const datosIdioma = Object.values(datos["idiomas"]).find(
    (item) => Object.keys(item)[0] === idiomaSeleccionado
  )[idiomaSeleccionado];
  function cambiarIcono(a, valor) {
    Fmostrar(valor);
    FiconoActivo(valor);
  }
  function resetIcono() {
    Fmostrar(0);
    FiconoActivo(null);
  }
  //const nombresIdiomas = datos["idiomas"].map((obj) => Object.keys(obj)[0]);
  const nombresIdiomas = datos["idiomas"].map((obj) => Object.keys(obj)[0]);
  const subcategorias = Object.keys(datosIdioma)
  console.log(Object.values(datos["idiomas"]));
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
              {subcategorias[0]}
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
               {subcategorias[1]}
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
             {subcategorias[2]}
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
                {idiomaSeleccionado}
              <ion-icon
                name={
                  iconoActivo === 4 ? "caret-up-outline" : "caret-down-outline"
                }
              ></ion-icon>
              {mostrar === 4 && (
                <div className={estilos.flotante}>
                  <div className={estilos.flotanteA}>
                    <ul className={estilos.flotanteulZ}>
                      {nombresIdiomas.map((a, index) => (
                        <li key={index} className={estilos.flotanteulliZ}>
                          <Link href={`#${a}`} onClick={()=>{FidiomaSeleccionado(a);Fmostrar(0);FiconoActivo(null)}}>{a}</Link>
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
