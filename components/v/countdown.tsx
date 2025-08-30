"use client";
import * as fonts from "@/fonts";
import { getDateDifference, dateDifference } from "@/lib/utils";

import { useEffect, useState } from "react";

export const CountDown = ({ saleDate }: { saleDate?: Date }) => {

  const [remainingTime, setRemainingTime] = useState<string>("00:00:00:00");
  const updateRemainingTime = () => {
    const now = new Date();
          if(!saleDate) return;
          if (now.getTime() < saleDate.getTime()) {
            const diff = getDateDifference(now, saleDate);
            Object.keys(diff).forEach((k: string) => {              
              if (Number(diff[k as keyof dateDifference]) < 10) {
                diff[k as keyof dateDifference] = "0" + diff[k as keyof dateDifference];
              }
            });
            const { days, hours, minutes, seconds } = diff;
            setRemainingTime(`${days}:${hours}:${minutes}:${seconds}`);
          }else{
            setRemainingTime("00:00:00:00");
          }
  }
  useEffect(() => {
    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <h3 className={`${fonts.clock.className} text-white w-full text-center  text-[90px] md:text-[140px]`}>
      {remainingTime}
    </h3>
  );
};
