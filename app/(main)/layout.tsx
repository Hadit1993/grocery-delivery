export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <p>banner</p>
      <nav>navbar</nav>
      <main className="min-h-screen">{children}</main>
      <footer>footer</footer>
      <p>Cart SideBar</p>
    </>
  );
}
