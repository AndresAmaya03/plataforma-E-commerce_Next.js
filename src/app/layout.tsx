import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono } from "@/config/font";
import { Provider } from '../components/provider/Provider';



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
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
