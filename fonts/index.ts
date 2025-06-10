import localFont from "next/font/local";

export const logo = localFont({ src: "./FieldGothic15.woff" });

export const complementary = localFont({ 
  src: [
    { path: "./centurygothic.ttf", weight: "400", style: "normal" },
    { path: "./centurygothic_bold.ttf", weight: "700", style: "normal" }
  ]
});

export const clock = localFont({ src: "./DSDIGI.ttf" });

export const handwrite = localFont({ 
  src: "./Cylburn.otf",
  display: "swap" // opcional, mejora la carga visual
});

export const graffiti = localFont({ 
  src: "./Leaders_PERSONAL_USE_ONLY.ttf",
  display: "swap"
});
