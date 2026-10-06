import "../styles/globals.css";

export const metadata = {
  title: "Axel Mercado | Portfolio",
  description: "Portfolio minimalista de Francisco Axel Mercado",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
