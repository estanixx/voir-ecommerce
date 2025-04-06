import Link from "next/link";
import { FaWhatsapp, FaFacebook, FaInstagram,  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const icons = {
  'whatsapp': FaWhatsapp,
  'facebook': FaFacebook,
  'x': FaXTwitter,
  'instagram': FaInstagram,
}
export const SocialMedia = ({ socialMedia }: { socialMedia: { [key: string]: string } }) => {

  return (
    <ul className='flex gap-4'>
      {
        Object.entries(socialMedia).map(([key, val]) => {
          const IconElement = icons[key];
          if (!IconElement) return null;
          return (
            <a key={key} href={val} className=''>
              <IconElement className='size-5'/>
            </a>
          );
        })
      }
    </ul>
  )
}