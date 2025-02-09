import { NavBar } from "@/app/components/NavBar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 py-5 lg:px-8">
        <main className="font-work-sans flex-1">{children}</main>
      </div>
    </>
  );
}
