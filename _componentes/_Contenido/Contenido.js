"use client"
import estilos from "./contenido.module.css"
import Image from "next/image"
import { useState } from "react"
import imagen1 from "../../public/imagen1.jpg"; 
export default function Contenido(){
    return(
        <div className={estilos.todo}>
            <div className={estilos.cambio}>
                <div className={estilos.imagenContenedor}>
                    <Image src={imagen1} fill alt="" placeholder="blur"/>
                </div>
            </div>
        </div>
    )
}