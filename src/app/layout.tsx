import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const financierDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/FinancierDisplayLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/FinancierDisplayRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/FinancierDisplayMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/FinancierDisplayBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/FinancierDisplayBlack.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-financier-display",
});

export const metadata: Metadata = {
  title: "AMFM Portal",
  description: "HeartChart ministry dashboard and design system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${financierDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
