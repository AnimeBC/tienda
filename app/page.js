"use client"
/*import de estilos y librerias*/
import Image from "next/image";
import styles from "./page.module.css";
/**import de jsaon de datos*/
import barra from './datos.json';
/**Import de componentes */
import Barra from "./_Barra/barra";
export default function Home() {
  return (
    <div>
      <nav>
        <Barra datos={barra}></Barra>
      </nav>
      hola 
    </div>
  );
}
