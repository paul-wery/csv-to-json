import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { configuration } from "./configuration";
import "./globals.css";

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
      <body>
        <main className={"w-full h-full"}>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
