import { useRef, useState, useEffect } from 'react';
import estilos from "./servicios.module.css";
import Image from "next/image";
import img1 from "../../public/imagen1.png";
import img2 from "../../public/imagen1.jpg";
import img3 from "../../public/imagen1.png";
import img4 from "../../public/imagen1.jpg";

export default function Servicios() {
    const items = [
        { src: img1, title: "EQUIPOS", description: "Me interesa" },
        { src: img2, title: "POSTPAGO MAX", description: "Me interesa" },
        { src: img3, title: "CLARO HOGAR", description: "Me interesa" },
        { src: img4, title: "PREPAGO CHÉVERE", description: "Me interesa" }
    ];

    const carruselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const updateCarouselWidth = () => {
            const carousel = carruselRef.current;
            if (carousel) {
                carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
        };
        updateCarouselWidth();
    }, [currentIndex]);

    const scrollLeft = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const scrollRight = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, items.length - 3));
    };

    return (
        <div className={estilos.todo}>
            <div className={estilos.titulo}>
                <h1>Servicios</h1>
            </div>
            <div className={estilos.carrusel_container}>
                <button className={`${estilos.arrow} ${estilos.arrow_left}`} onClick={scrollLeft}>&#9664;</button>
                <div className={estilos.carrusel} ref={carruselRef}>
                    {items.map((item, index) => (
                        <div key={index} className={estilos.card}>
                            <Image src={item.src} alt={item.title} />
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <button>{item.description}</button>
                        </div>
                    ))}
                </div>
                <button className={`${estilos.arrow} ${estilos.arrow_right}`} onClick={scrollRight}>&#9654;</button>
            </div>
        </div>
    );
}
