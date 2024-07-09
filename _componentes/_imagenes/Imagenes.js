import React from "react"
import Image from "next/image"
import estilos from "./imagenes.module.css"
export default function Imagenes({ url }) {
  return (
    <div className={estilos.todo}>
      <Image src={`/${url}`} fill  alt="Imagen cargando" />
    </div>
  );
}
