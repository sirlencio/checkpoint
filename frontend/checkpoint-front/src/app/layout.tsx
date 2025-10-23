import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CheckPoint",
  description: "Tu tracker de videojuegos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className="bg-gray-900 text-white flex flex-col min-h-screen"
        style={{
          backgroundImage: "url('https://wallpapers.com/images/hd/titanfall-2-4k-gaming-upm0ozmh3a7m8i4s.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Header />
        <div className="flex flex-1">
          {/*<Sidebar />*/}
          <main className="flex-1 p-6">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
