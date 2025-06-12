import { Menu } from "lib/shopify/types";
import Link from "next/link";
import * as fonts from '../../../fonts';
// import { title } from "process";
const DropDownMenuCard = ({ title, menu }: { title: string, menu: Menu[] }) => {
  if(menu.length < 1) return;
  const MenuItems = menu.map((item: Menu) => (
      <li key={item.title}>
        <Link
          href={item.path}
          prefetch={true}
          className="text-black underline-offset-4 hover:text-black hover:underline font-light"
        >
          {item.title}
        </Link>
      </li>));
  return <li>
    <h2 className={`${fonts.logo.className} text-5xl uppercase text-black font-bold`} >{ title }</h2>
    <ul>{ MenuItems }</ul>
  </li>
}

export const DropDownMenu = ({
  shopMenus = {},
}: {
  shopMenus: { [key: string]: Menu[] };
}) => {
  const menus = Object.entries( shopMenus ).map( ([title, menu]) => {
    return <DropDownMenuCard key={title} title={title} menu={menu}/>
  } )
  if( menus.length < 1 ) return;
  return <ul className='bg-white absolute top-full left-0 w-full flex justify-around py-3 px-1 shadow-xl'>
    {menus}
  </ul>;
};
