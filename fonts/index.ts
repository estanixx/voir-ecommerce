import localFont from "next/font/local";

export const logo = localFont({ src: "./FieldGothic15.woff"});
export const complementary = localFont({ 
  src: [
    { path: "./centurygothic.ttf", weight: "400", style: "normal" }, // Regular
    { path: "./centurygothic_bold.ttf", weight: "700", style: "normal" } // Bold
  ]
});
export const clock = localFont({ src: "./DSDIGI.ttf" });