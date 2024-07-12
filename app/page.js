"use client"
/*import de estilos y librerias*/
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
/**import de jsaon de datos*/
import barra from './datos.json';
/**Import de componentes */
import Barra from "../_componentes/_Barra/Barra";
import Contenido from "@/_componentes/_Contenido/Contenido";
import Servicios from "@/_componentes/_Servicios/Servicios";
import Noticias from "@/_componentes/_Noticias/Noticias";
export default function Home() {
  const [idiomaSeleccionado, FidiomaSeleccionado] = useState("Español");
  const [seleccion,Fseleccion]=useState("")
  return (
    <div>
      <nav>
        <Barra datos={barra} FidiomaSeleccionado={FidiomaSeleccionado} idiomaSeleccionado={idiomaSeleccionado}  Fseleccion={Fseleccion} seleccion={seleccion} ></Barra>
      </nav>
      <div>
        <Contenido Fseleccion={Fseleccion} seleccion={seleccion} FidiomaSeleccionado={FidiomaSeleccionado} idiomaSeleccionado={idiomaSeleccionado} >
        </Contenido>  
      </div>
      <div>
        <Servicios/> 
      </div>
      <div>
        <Noticias idiomaSeleccionado={idiomaSeleccionado}></Noticias>
      </div>
    </div>
  );
}
