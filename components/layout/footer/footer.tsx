import Link from "next/link";
import FooterMenu from "@/components/layout/footer/footer-menu";
import LogoSquare from "@/components/logo-square";
import { getMenu } from "@/lib/shopify";
import { Suspense } from "react";
import * as fonts from "@/fonts";
import LogoIcon from "../../icons/logo";
import { SocialMedia } from './social-media';

const { COMPANY_NAME, SITE_NAME, SOCIAL_MEDIA } = process.env;

export default async function Footer() {
  const socialMedia = JSON.parse(SOCIAL_MEDIA || "{}");
    const footerMenus = {
      'Voir': await getMenu('frontend-footer-voir'),
      'Políticas': await getMenu('frontend-footer-policy'),
    };
    console.log(footerMenus);
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2025 + (currentYear > 2025 ? `-${currentYear}` : "");
  const skeleton =
    "w-full h-6 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700";
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400 bg-white">
      <div className="mx-auto w-full max-w-7xl flex-col gap-6 px-6 py-12 grid grid-cols-6 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        {/* Logo y nombre del sitio */}
        <div className='flex flex-col justify-between items-center'>
          <Link
            className="items-center gap-2 text-black md:pt-1 dark:text-white flex flex-col justify-center"
            href="/"
          >
            <span className={`uppercase ${fonts.logo.className} text-5xl mb-[-30px]`} >{copyrightName}</span>
            <LogoIcon className="fill-black size-12"/>
          </Link>
          <SocialMedia socialMedia={socialMedia}/>

        </div>

        {/* Menú del footer */}
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2 col-span-3">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={footerMenus} />
        </Suspense>

        {/* Texto "VOIR" y párrafo */}
        <div className="justify-end col-span-3">
          <h1 className={`${fonts.logo.className} text-5xl `}>VOIR</h1>
          <p className="w-full">
            Voir no es solo una marca; es una visión. Cada gorra es un símbolo
            de autenticidad y propósito, creada para quienes ven más allá de lo
            superficial y buscan algo que los represente. No seguimos modas,
            reflejamos identidades. Somos para los inconformes, los que trazan
            su propio camino con claridad y determinación. Voir es una
            invitación a iluminarse, a descubrir la grandeza en cada paso. No
            vendemos solo un accesorio; acompañamos tu historia, tus sueños y
            las metas que aún te esperan.
          </p>
          <p className='md:w-1/2 mt-4'>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            All rights reserved.
          </p>
          <section></section>
        </div>
      </div>
      {/* Redes sociales */}
    </footer>
  );
}