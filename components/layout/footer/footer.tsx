import Link from "next/link";
import FooterMenu from "@/components/layout/footer/footer-menu";
// import LogoSquare from "@/components/logo-square"; // Not used in the provided snippet
import { getMenu } from "@/lib/shopify";
import { Suspense } from "react";
import * as fonts from "@/fonts";
import LogoIcon from "../../icons/logo";
import { SocialMedia } from './social-media'; // Assuming SocialMedia is in the same directory

const { COMPANY_NAME, SITE_NAME, SOCIAL_MEDIA } = process.env;

export default async function Footer() {
  const socialMedia = JSON.parse(SOCIAL_MEDIA || "{}");
  const footerMenus = {
    'Voir': await getMenu('frontend-footer-voir'),
    'Políticas': await getMenu('frontend-footer-policy'),
  };
  // console.log(footerMenus); // Consider removing for production

  const currentYear = new Date().getFullYear();
  // Adjusted copyright year logic for correctness if currentYear is less than 2025
  const startYear = 2025; // Assuming 2023 is the actual start year for copyright
  const copyrightDate = startYear === currentYear ? startYear : `${startYear}-${currentYear}`;

  const skeleton = "w-full h-5 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700";
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="text-sm text-neutral-500 bg-white  border-t border-neutral-200 ">
      <div className="mx-auto w-full max-w-7xl flex flex-col md:flex-row md:justify-between gap-10 md:gap-12 px-6 py-12 text-sm">

        {/* Section 1: Logo, Name, Social Media */}
        <div className='flex flex-col items-center md:items-start md:flex-shrink-0 md:w-auto space-y-6 text-center md:text-left'>
          <Link
            className="flex flex-col items-center justify-center gap-1 text-black dark:text-white"
            href="/"
          >
            {/* Adjusted font size and spacing for better responsiveness */}
            <span className={`block text-center uppercase ${fonts.logo.className} scale-x-150 tracking-wide text-3xl sm:text-4xl lg:text-5xl mb-[-15px] sm:mb-[-20px] lg:mb-[-25px]`} >
              {copyrightName}
            </span>
            <LogoIcon className="fill-black size-10 sm:size-12"/>
          </Link>
          <div className="pt-2"> {/* Add some space before social media icons */}
            <SocialMedia socialMedia={socialMedia}/>
          </div>
        </div>

        {/* Section 2: Footer Menus */}
        {/* This section will take more relative space on medium screens */}
        <div className="w-full md:flex-grow lg:px-8">
          <Suspense
            fallback={
              // A more representative skeleton for potentially multiple menu columns
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 w-full">
                {[...Array(2)].map((_, colIndex) => ( // Assuming 2 menu groups (Voir, Políticas)
                  <div key={colIndex} className="flex flex-col gap-3">
                    <div className={`${skeleton} h-6 w-1/2 mb-1`} /> {/* Menu Title Skeleton */}
                    {[...Array(4)].map((_, rowIndex) => (
                      <div key={rowIndex} className={skeleton} />
                    ))}
                  </div>
                ))}
              </div>
            }
          >
            {/* FooterMenu component needs to handle the display of its 'menu' object
                (e.g., 'Voir' and 'Políticas' sections) responsively.
                It might lay them out in columns on wider screens. */}
            <FooterMenu menu={footerMenus} />
          </Suspense>
        </div>

        {/* Section 3: "VOIR" text, paragraph, copyright */}
        <div className="flex flex-col items-center md:items-end md:flex-shrink-0 md:w-auto space-y-6 text-center md:text-right">
          <div className="w-full max-w-md md:max-w-xs lg:max-w-sm"> {/* Constrain width of this text block */}
            <h3 className={`${fonts.logo.className} text-3xl sm:text-4xl lg:text-5xl  mb-3 text-black`}>
              <span className="scale-x-150 w-full">BRAND</span>
            </h3>
            <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
              Voir no es solo una marca; es una visión. Cada gorra es un símbolo
              de autenticidad y propósito, creada para quienes ven más allá de lo
              superficial y buscan algo que los represente. No seguimos modas,
              reflejamos identidades. Somos para los inconformes, los que trazan
              su propio camino con claridad y determinación. Voir es una
              invitación a iluminarse, a descubrir la grandeza en cada paso. No
              vendemos solo un accesorio; acompañamos tu historia, tus sueños y
              las metas que aún te esperan.
            </p>
          </div>
          <p className='text-xs text-neutral-500 w-full max-w-md md:max-w-xs lg:max-w-sm'>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".") ? "." : ""}
            {' '}All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}