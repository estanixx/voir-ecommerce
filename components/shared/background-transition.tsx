'use client';

// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

export const BackgroundTransition = () => {
  const containerRef = useRef(null);

  // Registrar plugins de GSAP
  // if (typeof window !== 'undefined') {
  //   gsap.registerPlugin(ScrollTrigger, useGSAP);
  // }

  // // Animación con GSAP
  // useGSAP(() => {
  //   if(containerRef?.current){
  //     const container = containerRef.current as HTMLElement;
  //     // Animación para disminuir la opacidad de la imagen
  //     gsap.to(container.querySelector('.background-image'), {
  //       opacity: 0, // Opacidad final (0 = transparente)
  //       scrollTrigger: {
  //         trigger: container, // Elemento que activa la animación
  //         start: 'top top', // Inicia la animación cuando el scroll está en la parte superior
  //         end: 'bottom top', // Termina la animación cuando el scroll llega al final del contenedor
  //         scrub: true, // Suaviza la animación mientras se hace scroll
  //       },
  //     });

  //   }
  // }, { scope: containerRef, dependencies: [] }); // Asociar useGSAP al scope del contenedor

  return (
    <div ref={containerRef} className="-z-50 fixed top-0 left-0 w-full h-screen">
        {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/resources/illuminare.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* Imagen de fondo */}
      {/* <div
        className="background-image absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: 'url("/resources/voir-sunset-bg.jpg")' }}
      ></div> */}


    </div>
  );
};