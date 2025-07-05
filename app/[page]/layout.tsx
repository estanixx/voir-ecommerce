
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>

      <div className="w-full">
        <div className="mx-8 max-w-2xl pt-5 mt-20 pb-20 px-10 bg-white sm:mx-auto">{children}</div>
      </div>
    </>
  );
}
