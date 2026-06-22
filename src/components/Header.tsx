"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search/games/${encodeURIComponent(query.trim())}`);
  };

  return (
  <header className="bg-gray-800/90 backdrop-blur border-b border-gray-700 drop-shadow-[1px_1px_2px_black]">
    <div className="w-full px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      {/* Logo - SIEMPRE a la izquierda */}
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/images/checklogo.png"
          alt="Logo CheckPoint"
          width={40}
          height={40}
          className="object-contain"
        />
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          CheckPoint
        </h1>
      </Link>

      {/* Search centrada en desktop */}
      <form
        onSubmit={handleSearch}
        className="relative w-full md:w-[350px] lg:w-[400px] md:mx-auto"
      >
        <input
          type="text"
          placeholder="Buscar videojuegos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
        />
        <Search
          className="absolute left-3 top-2.5 text-gray-400"
          size={18}
        />
      </form>

      {/* Navegación - SIEMPRE a la derecha en desktop */}
      <nav className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-white text-sm sm:text-base md:justify-end">
        <Link href="/" className="hover:text-green-400 transition">
          Inicio
        </Link>

        {user ? (
          <Link href={`/profile/${user.username}`} className="hover:text-green-400 transition">
            Profile {user.username || user.email}
          </Link>
        ) : (
          <>
            <Link href="/login" className="hover:text-green-400 transition">
              Log In
            </Link>
            <Link href="/register" className="hover:text-green-400 transition">
              Register
            </Link>
          </>
        )}
      </nav>

    </div>
  </header>
);
}
