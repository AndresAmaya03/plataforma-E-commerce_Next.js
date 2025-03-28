import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono } from "@/config/font";
import { Providers } from '../components/providers/Providers';



export const metadata: Metadata = {
  title: {
    template: '%s - Platform-Shop',
    default: 'Home - Platform-Shop'
  },
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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
