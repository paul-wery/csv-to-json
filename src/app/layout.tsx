import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { configuration } from "./configuration";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: configuration.siteName,
  description: configuration.siteDescription,
  openGraph: {
    title: configuration.siteName,
    description: configuration.siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={"w-full h-full"}>{children}</main>
      </body>
    </html>
  );
}
