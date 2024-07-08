import React from "react"
import Image from "next/image"
import { getPlaiceholder } from "plaiceholder"
import fs from "node:fs/promises"
export default async function Imagenes({url}){
    const conector= await fs.readFile(`./public${url}`)
    const {base64} = await getPlaiceholder(conector)
return(
    <div className={estilos.todo}>
        <Image src={url} fill alt="Imagen cargando" placeholder="blur" blurDataURL={base64} />
    </div>
)    

}