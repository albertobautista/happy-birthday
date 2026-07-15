import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
