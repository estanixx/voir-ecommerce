"use client";

import { CountDown } from "@/components/v/countdown";
import NewsletterForm from "@/components/v/newsletter-form";
import LogoIcon from "@/components/icons/logo";
import { complementary, graffiti, logo } from "@/fonts";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePasscode } from "@/components/shared/passcode-context";
import { Passcode } from "@/components/v/passcode";
import { useRouter } from "next/navigation";

export default function VPage() {
  const {passcode, presale, sale, passcodeIsCorrect, setPasscode} = usePasscode();
  useEffect(() => {
    if (sale || (passcode && passcodeIsCorrect)){
      
    }
  }, [sale, presale, passcode, passcodeIsCorrect])

  return (
    <>
      <Image src='/resources/landing-bg.png' width={1312} height={736} alt='Landing Background' className='w-full h-screen fixed top-0 left-0 z-[-1]'/>
      <LogoIcon className="fill-white w-18 absolute top-9 right-9" />
      <div className="w-full flex flex-col h-screen items-center justify-center">
        {/* <LogoIcon className="fill-white w-28" /> */}
        <h1 className={`mt-6 text-3xl md:text-7xl text-center text-white tracking-widest ${graffiti.className} font-bold`}>
          Temporarily Close
        </h1>
        <div className="mt-8">
          <CountDown />
        </div>
        {
          presale ?
          <Passcode  passcodeIsCorrect={passcodeIsCorrect} passcode={passcode} setPasscode={setPasscode} />
          :
          <NewsletterForm />
        }
      </div>
    </>
  );
}
