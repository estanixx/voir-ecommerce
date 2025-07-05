"use client";

import { useEffect } from "react";

export function RegisterSW() {
  useEffect(() => {
    console.log('voirstore.com')
    // Registra el Service Worker solo en el navegador y en producción.
    if ("serviceWorker" in navigator) {
      console.log('[sw]: registering service worker');
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then(() => {
            console.log("[sw]: registered");
          })
          .catch((error) => {
            console.error("[sw]:", error);
          });
      });
    }
  }, []);

  return null; // Este componente no renderiza nada.
}
