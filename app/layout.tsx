import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Minecraft Gradient Name Generator",
  description: "Generate Minecraft gradient names easily!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
