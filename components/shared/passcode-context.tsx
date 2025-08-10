"use client"
import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { PRESALE_DATE, SALE_DATE } from "@/lib/constants";
import { useRouter } from 'next/navigation';

type PasscodeContextType = {
  passcode: string;
  setPasscode: (passcode: string) => void;
  presale: boolean;
  sale: boolean;
  passcodeIsCorrect: boolean;
}

export const PasscodeContext = createContext<PasscodeContextType>({
  passcode: "",
  setPasscode: () => undefined,
  presale: false,
  sale: false,
  passcodeIsCorrect: false,
});

export function PasscodeProvider({ children, localStorageKey, passcodeValue }: { children: ReactNode, localStorageKey: string, passcodeValue: string }) {

  const router = useRouter();

  const [passcode, $setPasscode] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [presale, setPresale] = useState<boolean>(() => new Date().getTime() < SALE_DATE.getTime() && new Date().getTime() >= PRESALE_DATE.getTime());
  const [sale, setSale] = useState<boolean>(() => new Date().getTime() >= SALE_DATE.getTime());
  const passcodeIsCorrect = passcode === passcodeValue;

  // useEffect to load from localStorage
  useEffect(() => {
    const storedPasscode = localStorage.getItem(localStorageKey) || '';
    $setPasscode(storedPasscode);
    setLoading(false);

    // 3. Set loading to false after the passcode has been loaded
  }, [localStorageKey]);

  // Protection useEffect
  useEffect(() => {
    // 2. Add a guard clause. Don't run logic until loading is finished.
    // This logic is the same, but now it runs with the correct passcode state
    if (!isLoading && !sale && (!presale || !passcodeIsCorrect)){ 
      router.push('/v');
    }
  }, [sale, presale, router, passcodeIsCorrect, isLoading]) // Add new dependencies

  // Interval to check dates
  useEffect(() => {
    const interval = setInterval(() => {
      setPresale(new Date().getTime() < SALE_DATE.getTime() && new Date().getTime() >= PRESALE_DATE.getTime());
      setSale(new Date().getTime() >= SALE_DATE.getTime());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [])



  const setPasscode = (passcode: string) => {
    localStorage.setItem(localStorageKey, passcode);
    $setPasscode(passcode);
  };

  return (
    <PasscodeContext.Provider value={{ passcode, setPasscode, presale, sale, passcodeIsCorrect }}>
      {children}
    </PasscodeContext.Provider>
  );
}

export function usePasscode() {
  return useContext(PasscodeContext);
}