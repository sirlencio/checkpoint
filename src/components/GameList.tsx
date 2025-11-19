"use client";

import { Game } from "@/types/game";
import GameItem from "./GameItem";

interface Props {
  games: Game[] | null;
}

export default function GameList({ games }: Props) {
  if (!games || games.length === 0) {
    return <p className="text-center text-white mt-10">No se encontraron resultados.</p>;
  }

  return (
    <div className="flex flex-col items-center px-4 py-6">
      {games.map(game => (
        <GameItem key={game.id} game={game} />
      ))}
    </div>
  );
}
