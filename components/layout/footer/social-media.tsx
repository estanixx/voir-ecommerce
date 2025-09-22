import Link from 'next/link';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
// import { IconType } from 'react-icons';

// The icons object is well-defined.
const icons = {
  whatsapp: FaWhatsapp,
  facebook: FaFacebook,
  x: FaXTwitter,
  instagram: FaInstagram,
  tiktok: FaTiktok,
};

// Create a type that represents the valid keys of the `icons` object.
type SocialIconKey = keyof typeof icons;

export const SocialMedia = ({
  socialMedia
}: {
  socialMedia: { [key: string]: string };
}) => {
  return (
    <ul className="flex gap-4">
      {Object.entries(socialMedia).map(([key, val]) => {
        // Assert that 'key' is of type 'SocialIconKey'.
        const iconKey = key as SocialIconKey;

        // Use the asserted key to safely access the icon component.
        const IconElement = icons[iconKey];
        
        // This check is still good practice for runtime safety.
        if (!IconElement || !val) return null;

        return (
          <Link key={iconKey} href={val} className="">
            <IconElement className="size-5" />
          </Link>
        );
      })}
    </ul>
  );
};