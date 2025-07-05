'use client';

import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, Suspense, useEffect, useState } from 'react';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Menu as MenuType } from '@/lib/shopify/types'; // Renamed to avoid conflict with component name
import Search, { SearchSkeleton } from './search';

export default function MobileMenu({ menu }: { menu: MenuType[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) { // md breakpoint
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]); // Dependency remains isOpen, as we only care about closing if it's open and resize occurs

  useEffect(() => {
    setIsOpen(false); // Close menu on route changes
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-10 w-10 items-center justify-center rounded-lg border text-white fill-white border-neutral-300 transition-colors hover:border-neutral-400 md:hidden dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500"
        // Adjusted size slightly, border and text colors for a softer look
      >
        <Bars3Icon className="h-5 w-5" /> {/* Slightly larger icon */}
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={closeMobileMenu} className="relative z-100 md:hidden"> {/* Ensure it's hidden on md screens via class too */}
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
            {/* Increased backdrop opacity and consistent blur */}
          </Transition.Child>

          {/* Panel */}
          <Transition.Child
            as={Fragment}
            enter="transition-transform ease-in-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 left-0 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white shadow-xl dark:bg-neutral-900">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
                <Dialog.Title className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                  Menu
                </Dialog.Title>
                <button
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Content Body */}
              <div className="flex-grow p-4 space-y-6">
                <div className="w-full">
                  <Suspense fallback={<SearchSkeleton />}>
                    <Search />
                  </Suspense>
                </div>

                {menu.length ? (
                  <nav>
                    <ul className="flex flex-col space-y-1">
                      {menu.map((item: MenuType) => {
                        const isActive = pathname === item.path;
                        return (
                          <li key={item.title}>
                            <Link
                              href={item.path}
                              prefetch={true}
                              onClick={closeMobileMenu}
                              className={`block rounded-md px-3 py-2.5 text-base font-medium transition-all duration-150 ease-in-out
                                ${isActive
                                  ? 'bg-blue-600 text-white shadow-sm' // Active state
                                  : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 dark:active:bg-neutral-700'
                                }`}
                            >
                              {item.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                ) : null}
              </div>

              {/* Optional Footer - uncomment and customize if needed
              <div className="p-4 mt-auto border-t border-neutral-200 dark:border-neutral-800">
                <p className="text-xs text-center text-neutral-500 dark:text-neutral-400">
                  Your Company &copy; {new Date().getFullYear()}
                </p>
              </div>
              */}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}