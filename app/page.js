"use client"
/*import de estilos y librerias*/
import { useState } from "react";
/**import de jsaon de datos*/
import barra from './datos.json';
import planes from "./planes.json"
import servicios from "./Servicios.json"
/**Import de componentes */
import Barra from "@/_componentes/_Barra/Barra";
import Contenido from "@/_componentes/_Contenido/Contenido";
import Servicios from "@/_componentes/_Servicios/Servicios";
import Noticias from "@/_componentes/_Noticias/Noticias";
import Planes from "@/_componentes/_Planes/Planes";
export default function Home() {
  const [idiomaSeleccionado, FidiomaSeleccionado] = useState("Español");
  const [seleccion,Fseleccion]=useState("")
  return (
    <div>
      <nav>
        <Barra datos={barra} FidiomaSeleccionado={FidiomaSeleccionado} idiomaSeleccionado={idiomaSeleccionado}  Fseleccion={Fseleccion} seleccion={seleccion} ></Barra>
      </nav>
      {
        
      }
      <div>
        <Contenido Fseleccion={Fseleccion} seleccion={seleccion} FidiomaSeleccionado={FidiomaSeleccionado} idiomaSeleccionado={idiomaSeleccionado} >
        </Contenido>  
      </div>
      <div>
        <Planes datos={planes} FidiomaSeleccionado={FidiomaSeleccionado} idiomaSeleccionado={idiomaSeleccionado}>
        </Planes>  
      </div>
      <div>
        <Servicios  datos={servicios} FidiomaSeleccionado={FidiomaSeleccionado} idiomaSeleccionado={idiomaSeleccionado}  Fseleccion={Fseleccion} seleccion={seleccion}  /> 
      </div>
      <div>
        <Noticias idiomaSeleccionado={idiomaSeleccionado}></Noticias>
      </div>
    </div>
  );
}
