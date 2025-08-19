// import Footer from "@/components/layout/footer/footer";
// import Collections from "@/components/layout/shop/collections";
// import FilterList from "@/components/layout/shop/filter";
// import { sorting } from "@/lib/constants";
import ChildrenWrapper from "./children-wrapper";
import { Suspense } from "react";
// import { BackgroundTransition } from "@/components/shared/background-transition";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <BackgroundTransition /> */}
      <div className="mx-auto mt-20 flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        <div className="order-first w-full flex-none md:max-w-[125px]">
          {/* <Collections /> */}
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </div>
        <div className="order-none flex-none md:order-last md:w-[125px]">
          {/* <FilterList list={sorting} title="Ordenar por" /> */}
        </div>
      </div>
    </>
  );
}
