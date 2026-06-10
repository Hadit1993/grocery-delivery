import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const vazirMatn = localFont({
  src: [
    { path: "../assets/fonts/Vazirmatn-RD-FD-Regular.woff2", weight: "400" },
    { path: "../assets/fonts/Vazirmatn-RD-FD-Medium.woff2", weight: "500" },
    { path: "../assets/fonts/Vazirmatn-RD-FD-SemiBold.woff2", weight: "600" },
    { path: "../assets/fonts/Vazirmatn-RD-FD-Bold.woff2", weight: "700" },
  ],
});

export const metadata: Metadata = {
  title: "تازه‌بار | خرید آنلاین خواربار، مواد غذایی و مایحتاج روزانه",
  description:
    "خرید آنلاین خواربار، مواد غذایی، نوشیدنی، تنقلات و مایحتاج روزانه با قیمت مناسب و ارسال سریع. سفارش آسان و تحویل درب منزل از تازه‌بار",
};

const toastOptions = {
  duration: 3000,
  style: {
    background: "#1B3022",
    color: "white",
    borderRadius: "12px",
    fontSize: "14px",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" className={`${vazirMatn.className}`}>
      <body>
        {children}
        <Toaster position="top-right" toastOptions={toastOptions} />
      </body>
    </html>
  );
}
