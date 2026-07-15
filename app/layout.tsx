import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";

const bodyFont = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Feliz cumpleaños",
  description: "Una tarjeta de cumpleaños interactiva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={bodyFont.variable}>{children}</body>
    </html>
  );
}
