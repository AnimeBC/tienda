import estilos from "./contenido.module.css";
import Image from "next/image";
import { useState } from "react";
import imagenes from "../../app/imagenes.json";
import Imagenes from "../_imagenes/Imagenes";
export default function Contenido() {
    const claves = Object.keys(imagenes.imagenes);
    const clavesOrdenadas = claves.sort((a, b) => parseInt(a) - parseInt(b));
    const ordenInicial = [clavesOrdenadas[1], clavesOrdenadas[0]]; // Reordenar para empezar con la clave "2"
    const urlsImagenes = ordenInicial.map((clave) => imagenes.imagenes[clave]);
    const [indiceActual, FindiceActual] = useState(0);

    const siguienteImagen = () => {
        FindiceActual((indicePrevio) =>
            indicePrevio === urlsImagenes.length - 1 ? 0 : indicePrevio + 1
        );
    };

    const anteriorImagen = () => {
        FindiceActual((indicePrevio) =>
            indicePrevio === 0 ? urlsImagenes.length - 1 : indicePrevio - 1
        );
    };

    return (
        <div className={estilos.todo}>
            <div className={estilos.cambio}>
                <div className={estilos.imagenContenedor}>
                    <Imagenes
                        url={`/${urlsImagenes[indiceActual]}`}
                    />
                </div>
                <div className={estilos.controles}>
                    <button onClick={anteriorImagen} className={estilos.anterior}>
                        &#10094;
                    </button>
                    <button onClick={siguienteImagen} className={estilos.siguiente}>
                        &#10095;
                    </button>
                </div>
            </div>
        </div>
    );
}
