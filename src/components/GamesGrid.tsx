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
      <h2 className="text-5xl font-bold text-center text-white underline underline-offset-4 mb-6">
        Juegos Populares
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-2 gap-6 p-4">
        {games.map((game) => (
          <GameGridItem key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
