"use client";


import { useGames } from "@/hooks/useGames";
import Image from "next/image";
import Link from "next/link";

export default function GameCarousel() {
  const {games, loading, error} = useGames();

  if (loading)
    return <p className="text-center text-white mt-10">Cargando juegos...</p>;
  if (error)
    return <p className="text-center text-red-400 mt-10">Error: {error}</p>;

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
                src={game.cover.url}
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
