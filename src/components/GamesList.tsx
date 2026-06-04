"use client";

import { Game } from "@/types/game";
import GameListItem from "./GameListItem";
import GamesListSkeleton from "./GameListSkeleton";
interface Props {
  games: Game[] | null;
  loading?: boolean;
}

export default function GamesList({ games, loading }: Props) {
  if (loading) {
    return <GamesListSkeleton />;
  }

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
