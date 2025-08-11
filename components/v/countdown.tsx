"use client";
import * as fonts from "@/fonts";
import { SALE_DATE } from "@/lib/constants";
import { getDateDifference, dateDifference } from "@/lib/utils";

import { useEffect, useState } from "react";

export const CountDown = () => {

  const [remainingTime, setRemainingTime] = useState<string>("00:00:00:00");
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getTime() < SALE_DATE.getTime()) {
        const diff = getDateDifference(now, SALE_DATE);
        Object.keys(diff).forEach((k: string) => {
          if (diff[k as keyof dateDifference]){
            if (Number(diff[k as keyof dateDifference]) < 10) {
              diff[k as keyof dateDifference] = "0" + diff[k as keyof dateDifference];
            }
          }
        });
        const { days, hours, minutes, seconds } = diff;
        setRemainingTime(`${days}:${hours}:${minutes}:${seconds}`);
      }else{
        setRemainingTime("00:00:00:00");
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className={`${fonts.clock.className} text-white w-full text-center  text-[90px] md:text-[140px]`}>
      {remainingTime}
    </div>
  );
};
