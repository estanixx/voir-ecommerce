'use client';

import clsx from 'clsx';
import { Menu } from '@/lib/shopify/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as fonts from '@/fonts';
export function FooterMenuItem({ item }: { item: Menu }) {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li>
      <Link
        href={item.path}
        className={clsx(
          'block p-2 text-lg underline-offset-4 hover:underline md:inline-block md:text-sm ',
          {
            'underline': active
          }
        )}
      >
        {item.title}
      </Link>
    </li>
  );
}

export default function FooterMenu({ menu }: { menu: { [key:string]: Menu[] } }) {
  return (
    <nav className='grid grid-cols-2 col-span-2'>
      {
        Object.entries(menu).map(([title, items]) => (
          <div key={title} className='flex flex-col gap-2'>
            <h3 className={`text-lg font-semibold ${fonts.complementary} font-bold `}>{title}</h3>
            <ul className='flex flex-col gap-2'>
              {items.map((item) => (
                <FooterMenuItem key={item.title} item={item} />
              ))}
            </ul>
          </div>
        ))
      }
    </nav>
  );
}
