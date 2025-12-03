"use client";

import { useGames } from "@/hooks/useGames";
import GameGridItem from "./GameGridItem";

export default function GameGrid() {
  const {games, loading, error} = useGames();

  if (loading)
    return <p className="text-center text-white mt-10">Cargando juegos...</p>;
  if (error)
    return <p className="text-center text-red-400 mt-10">Error: {error}</p>;

  if(!games || games.length === 0){
    return <p className="text-center text-white mt-10">No hay juegos disponibles.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-5xl font-bold text-center text-white underline underline-offset-4 mb-6 drop-shadow-[2px_2px_2px_black]">
        Trending Games
      </h2>
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 p-4">
        {games.map((game) => (
          <GameGridItem key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
