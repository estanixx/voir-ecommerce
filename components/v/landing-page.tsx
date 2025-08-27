"use client";

import { CountDown } from "@/components/v/countdown";
import NewsletterForm from "@/components/v/newsletter-form";
import LogoIcon from "@/components/icons/logo";
import { graffiti } from "@/fonts";
import Image from "next/image";
import { usePasscode } from "@/components/shared/passcode-context";
import dynamic from 'next/dynamic';

// Dynamically import the Passcode component with no SSR to avoid Tone.js errors
const Passcode = dynamic(
  () => import('@/components/v/passcode').then((mod) => mod.Passcode),
  { ssr: false }
);

export default function LandingPage() {
  const {passcode, presale, passcodeIsCorrect, setPasscode, saleDate} = usePasscode();
  
  return (
    <>
      <Image 
        src='/resources/landing-bg.png' 
        width={1312} 
        height={736} 
        alt='Voir Coming Soon Background' 
        className='w-full h-screen fixed top-0 left-0 z-[-1]'
        priority
      />
      <LogoIcon className="fill-white w-18 absolute top-9 md:right-9 md:translate-x-0 right-1/2 translate-x-1/2" />
      <div className="w-full flex flex-col h-screen items-center justify-center">
        <h1 className={`mt-6 text-3xl md:text-7xl text-center text-white tracking-widest ${graffiti.className} font-bold`}>
          Temporarily Close
        </h1>
        <div className="mt-8">
          <CountDown saleDate={saleDate}/>
        </div>
        {
          presale ?
          <Passcode passcodeIsCorrect={passcodeIsCorrect} passcode={passcode} setPasscode={setPasscode}/>
          :
          <NewsletterForm />
        }
      </div>
    </>
  );
}