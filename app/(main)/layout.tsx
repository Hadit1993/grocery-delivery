import Banner from "../components/shared/Banner";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Banner />
      {/* <p>banner</p> */}
      <nav>navbar</nav>
      <main className="min-h-screen">{children}</main>
      <footer>footer</footer>
      <p>Cart SideBar</p>
    </>
  );
}
