"use client";
import LogoIcon from "@/components/icons/logo";
import * as fonts from "@/fonts";
import { getDateDifference } from "@/lib/utils";

import localFont from "next/font/local";
import { useEffect, useState } from "react";
import { NewsletterModal } from "./newsletter-modal";

export const NextCollectionSection = () => {
  const [remainingTime, setRemainingTime] = useState("00:00:00:00");
  const nextCollectionDate = new Date(2025, 5, 20);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now < nextCollectionDate) {
        const diff = getDateDifference(now, nextCollectionDate);
        Object.keys(diff).forEach((k: string) => {
          if (diff[k] < 10) {
            diff[k] = "0" + diff[k];
          }
        });
        const { days, hours, minutes, seconds } = diff;
        setRemainingTime(`${days}:${hours}:${minutes}:${seconds}`);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <section
      className="grid grid-cols-5 py-2 w-full mt-4"
      style={{ backgroundColor: "rgb(0,0,0, 0.4)" }}
    >
      <div className="text-center col-span-2 flex flex-col justify-center items-center">
        <h1
          className={`${fonts.complementary.className} text-2xl center uppercase`}
        >
          Haz parte de esta visión
        </h1>
        <NewsletterModal />
        {/* <button className="cursor-pointer text-black bg-white rounded-full px-3 py-1 mt-2"
        onClick={() => openModal('newsletter')}>Suscríbete a nuestro newsletter</button> */}
        <p className="text-[10px] w-1/2 mt-2">
          Y obtén 10% de descuento en tu primera compra, más beneficios
        </p>
      </div>
      <figure className="flex justify-center items-center">
        <LogoIcon className="size-52" />
      </figure>
      <div className="text-center col-span-2 flex flex-col justify-center items-center">
        <h1
          className={`${fonts.complementary.className} uppercase text-2xl center`}
        >
          Próxima colección en:
        </h1>
        <span className={`${fonts.clock.className} text-6xl`}>
          {remainingTime}
        </span>
      </div>
    </section>
  );
};
