import Link from "next/link";
import FooterMenu from "@/components/layout/footer/footer-menu";
import { getMenu } from "@/lib/shopify";
import { Suspense } from "react";
import * as fonts from "@/fonts";
import LogoIcon from "../../icons/logo";
import { SocialMedia } from "./social-media";

const {
  COMPANY_NAME,
  SITE_NAME,
  WHATSAPP_CONTACT,
  INSTAGRAM_CONTACT,
  FACEBOOK_CONTACT,
  TIKTOK_CONTACT,
} = process.env;

const socialMedia = {
  whatsapp: WHATSAPP_CONTACT,
  instagram: INSTAGRAM_CONTACT,
  facebook: FACEBOOK_CONTACT,
  tiktok: TIKTOK_CONTACT,
};

export default async function InvertedFooter() {
  const footerMenus = {
    Voir: await getMenu("frontend-footer-voir"),
    Políticas: await getMenu("frontend-footer-policy"),
  };

  const currentYear = new Date().getFullYear();
  const startYear = 2025;
  const copyrightDate =
    startYear === currentYear ? startYear : `${startYear}-${currentYear}`;

  const skeleton =
    "w-full h-5 animate-pulse rounded-sm bg-neutral-700";
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="text-sm text-neutral-400 bg-black border-t border-neutral-800">
      <div className="w-full lg:w-11/12 mx-auto flex flex-col md:flex-row md:justify-between gap-10 md:gap-12 px-6 py-12 text-sm">
        {/* Section 1: Logo, Name, Social Media */}
        <div className="flex flex-col items-center justify-between md:items-start md:flex-shrink-0 md:w-auto space-y-6 text-center md:text-left">
          <Link
            className="flex flex-col items-center justify-center gap-1 text-white"
            href="/"
          >
            <LogoIcon className="fill-white size-12 sm:size-16" />
          </Link>
          <div className="pt-2">
            <SocialMedia
              socialMedia={{
                whatsapp: socialMedia.whatsapp || "",
                instagram: socialMedia.instagram || "",
                facebook: socialMedia.facebook || "",
                tiktok: socialMedia.tiktok || "",
              }}
            />
          </div>
        </div>

        {/* Section 2: Footer Menus */}
        <div className="w-full md:flex-grow lg:px-8">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 w-full">
                {[...Array(2)].map((_, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-3">
                    <div className={`${skeleton} h-6 w-1/2 mb-1`} />
                    {[...Array(4)].map((_, rowIndex) => (
                      <div key={rowIndex} className={skeleton} />
                    ))}
                  </div>
                ))}
              </div>
            }
          >
            <FooterMenu menu={footerMenus} />
          </Suspense>
        </div>

        {/* Section 3: "BRAND" text, paragraph, copyright */}
        <div className="flex flex-col items-center md:items-end md:flex-shrink-0 md:w-auto space-y-6 text-center md:text-right">
          <div className="w-full max-w-md md:max-w-xs lg:max-w-sm">
            <h3
              className={`${fonts.logo.className} text-3xl sm:text-4xl lg:text-5xl mb-3 text-white`}
            >
              <span className="scale-x-150 w-full">BRAND</span>
            </h3>
            <p className="text-justify text-xs leading-relaxed text-neutral-300">
              Voir no es solo una marca; es una visión. Cada gorra es un símbolo
              de autenticidad y propósito, creada para quienes ven más allá de
              lo superficial y buscan algo que los represente. No seguimos
              modas, reflejamos identidades. Somos para los inconformes, los que
              trazan su propio camino con claridad y determinación. Voir es una
              invitación a iluminarse, a descubrir la grandeza en cada paso. No
              vendemos solo un accesorio; acompañamos tu historia, tus sueños y
              las metas que aún te esperan.
            </p>
          </div>
          <p className="text-xs text-neutral-500 w-full max-w-md md:max-w-xs lg:max-w-sm">
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}