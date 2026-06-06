import Banner from "../components/shared/Banner";
import NavBar from "../components/shared/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Banner />
      <NavBar />
      <main className="min-h-screen">{children}</main>
      <footer>footer</footer>
      <p>Cart SideBar</p>
    </>
  );
}
