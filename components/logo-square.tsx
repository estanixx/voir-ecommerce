// import clsx from "clsx";
import LogoIcon from "./icons/logo";

export default function LogoSquare({ className = '' }: { className?: string }) {
  return (
    <figure
      className={"flex flex-none items-center justify-center"}
    >
      <LogoIcon className={className} />
    </figure>
  );
}
