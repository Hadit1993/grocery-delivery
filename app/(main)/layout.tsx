import Banner from "../components/shared/Banner";
import Footer from "../components/shared/Footer";
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
      <Footer />
      <p>Cart SideBar</p>
    </>
  );
}
