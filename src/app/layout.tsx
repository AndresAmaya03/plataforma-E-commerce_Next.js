import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono } from "@/config/font";



export const metadata: Metadata = {
  title: "E-commerce page",
  description: "An e-commerce shop for different products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
