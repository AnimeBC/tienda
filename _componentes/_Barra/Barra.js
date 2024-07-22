"use client";
import estilos from "./barra.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Imagenes from "../_imagenes/Imagenes";
export default function Barra({
  datos,
  FidiomaSeleccionado,
  idiomaSeleccionado,
  Fseleccion,
  seleccion,
}) {
  const [mostrar, Fmostrar] = useState(0);
  const [iconoActivo, FiconoActivo] = useState(null);
  const [flechaPos, FflechaPos] = useState("50%");
  const [fixed, setFixed] = useState(false);

  const datosIdioma = Object.values(datos["idiomas"]).find(
    (item) => Object.keys(item)[0] === idiomaSeleccionado
  )[idiomaSeleccionado];

  function cambiarIcono(a, valor) {
    Fmostrar(valor);
    FiconoActivo(valor);
    const rect = a.currentTarget.getBoundingClientRect();
    const parentRect = a.currentTarget.parentElement.getBoundingClientRect();
    const offset = rect.left + rect.width / 2 - parentRect.left;
    FflechaPos(`${offset}px`);
  }

  function resetIcono() {
    Fmostrar(0);
    FiconoActivo(null);
    FflechaPos("50%");
  }

  const nombresIdiomas = datos["idiomas"].map((obj) => Object.keys(obj)[0]);
  const subcategorias = Object.keys(datosIdioma);
  const datosDeSubCategorias = Object.values(datosIdioma);

  useEffect(() => {
    if (mostrar !== 0) {
      const subFlotante = document.querySelector(`.${estilos.subFlotante}`);
      if (subFlotante) {
        subFlotante.style.setProperty('--flecha-pos', flechaPos);
      }
    }
  }, [flechaPos, mostrar]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`${estilos.todo} ${fixed ? estilos.fixed : ''}`}>
      <div className={estilos.logo}>
        <Imagenes url={"Bitel.png"}/>
      </div>
      <div className={estilos.navegacion}>
        <nav className={estilos.navegacionA}>
          <ul className={estilos.navegacionul}>
            {subcategorias.map((subcategoria, index) => (
              <li
                key={index}
                onMouseEnter={(a) => cambiarIcono(a, index + 1)}
                onMouseLeave={resetIcono}
              >
                {subcategoria}
                <ion-icon
                  name={
                    iconoActivo === index + 1
                      ? "caret-up-outline"
                      : "caret-down-outline"
                  }
                ></ion-icon>
                {mostrar === index + 1 && (
                  <div className={estilos.subFlotante}>
                    {Object.values(datosDeSubCategorias[index]).map(
                      (a, b) => (
                        <div key={b} className={estilos.otros}>{a}</div>
                      )
                    )}
                  </div>
                )}
              </li>
            ))}
            <li
              onMouseEnter={(a) => cambiarIcono(a, subcategorias.length + 1)}
              onMouseLeave={resetIcono}
            >
              {idiomaSeleccionado}
              <ion-icon
                name={
                  iconoActivo === subcategorias.length + 1
                    ? "caret-up-outline"
                    : "caret-down-outline"
                }
              ></ion-icon>
              {mostrar === subcategorias.length + 1 && (
                <div className={estilos.subFlotante}>
                  {nombresIdiomas.map((a, index) => (
                    <div key={index} className={estilos.idiomas}>
                      <Link
                        href={`#${a}`}
                        onClick={() => {
                          FidiomaSeleccionado(a);
                          Fmostrar(0);
                          FiconoActivo(null);
                        }}
                      >
                        {a}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
