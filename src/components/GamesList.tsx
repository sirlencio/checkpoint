"use client";

import { Game } from "@/types/game";
import GameListItem from "./GameListItem";

interface Props {
  games: Game[] | null;
}

export default function GamesList({ games }: Props) {
  if (!games || games.length === 0) {
    return (
      <p className="text-center text-white mt-10">
        No se encontraron resultados.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center px-4 py-6">
      {games.map((game) => (
        <GameListItem key={game.id} game={game} />
      ))}
    </div>
  );
}
