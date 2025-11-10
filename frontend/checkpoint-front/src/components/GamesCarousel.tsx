"use client"
import { useGames } from "@/hooks/useGames"
import Image from "next/image"


export default function GameCarousel() {
  

  const { games, loading, error } = useGames();

  if (loading)
    return (
      <p className="text-center text-white py-4 text-xl">
        Cargando juegos...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-400 py-4 text-xl">
        Error: {error}
      </p>
    );
  return (
    <section className="py-4">
        <h2 className="text-3xl font-bold underline text-white text-center mb-8">
        Juegos Destacados
      </h2>
      <div className="flex justify-center gap-6 flex-wrap">
        {games.map((game, index) => (
          <div
            key={index}
            className="w-[200px] md:w-[190px] bg-gray-800 rounded-2xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={game.cover.url}
              alt={game.name}
              width={550}
              height={150}
              className="w-full h-50 object-cover"
            />
            <div className="p-2 text-center">
              <h3 className="text-lg font-semibold text-white">{game.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
