"use client";
import Barra from "@/_componentes/_Barra/Barra";
import { useState } from "react";
import barra from "../datos.json";
export default function Planes() {
  const [idiomaSeleccionado, FidiomaSeleccionado] = useState("Español");
  const [seleccion, Fseleccion] = useState("");
  return (
    <div>
      <div>
        <Barra
          datos={barra}
          FidiomaSeleccionado={FidiomaSeleccionado}
          idiomaSeleccionado={idiomaSeleccionado}
          Fseleccion={Fseleccion}
          seleccion={seleccion}
        ></Barra>
      </div>
      <div>

        
      </div>
    </div>
  );
}
