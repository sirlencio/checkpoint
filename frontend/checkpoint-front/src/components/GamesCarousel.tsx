"use client";

import { useEffect, useState } from "react";
import { Game } from "@/types/game";
import Image from "next/image";
import Link from "next/link";

const API_URL = "http://localhost:4000/api";

export default function GameCarousel() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`${API_URL}/games`);
        if (!res.ok) throw new Error("Error al obtener los juegos");

        const data = await res.json();

        const sorted = data
        .sort((a: Game, b: Game) => (b.hypes || 0) - (a.hypes || 0))
        .slice(0, 10);

        setGames(sorted);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <p className="text-center text-white mt-10">Cargando juegos...</p>;
  if (error) return <p className="text-center text-red-400 mt-10">Error: {error}</p>;

  return (
    <div className="p-4">
    {/* Título */}
    <h2 className="text-5xl font-bold text-center text-white underline underline-offset-4 mb-6">
      Juegos Populares
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-2 gap-6 p-4">
      {games.map((game) => (
        <Link
          key={game.id}
          href={`/game/${game.id}`}
          className="relative w-full h-[350px] bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
        >
          {game.cover?.url ? (
            <Image
              src={`https:${game.cover.url.replace("t_thumb", "t_cover_big")}`}
              alt={game.name}
              fill
              className="object-cover opacity-80"
            />
          ) : (
            <div className="bg-gray-700 w-full h-full flex items-center justify-center text-gray-300">
              Sin imagen
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 className="text-lg font-bold text-white">{game.name}</h3>

            {game.total_rating && (
              <p className="text-sm text-gray-300 mt-1">
                ⭐ {Math.round(game.total_rating)} / 100
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  </div>
  );
}
