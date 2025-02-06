import { NavBar } from "@/app/components/NavBar";
import SideBar from "@/app/components/SideBar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 py-5 lg:px-8 flex justify-start items-start gap-5">
        <main className="font-work-sans flex-1">{children}</main>
        <aside className="max-w-[375px] w-full sticky top-5 z-10 bg-white rounded-lg border border-gray-100">
          <SideBar />
        </aside>
      </div>
    </>
  );
}
