import Banner from "../components/shared/Banner";
import CartSidebar from "../components/shared/CartSidebar";
import Footer from "../components/shared/Footer";
import NavBar from "../components/shared/Navbar";
import { CartProvider } from "../contexts/CartContext";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <Banner />
      <NavBar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CartSidebar />
    </CartProvider>
  );
}
