"use client";

import { use } from "react";
import { useGames } from "@/hooks/useGames";
import GamesList from "@/components/GamesList";
import GamesListSkeleton from "@/components/GameListSkeleton";
interface Props {
  params: Promise<{ gameName: string }>;
}

export default function SearchPage({ params }: Props) {
  const { gameName } = use(params);

  const decodedName = decodeURIComponent(gameName);

  const { games, loading, error } = useGames({ searchTerm: decodedName });

  return (
    <main className="min-h-screen bg-gray-900 text-white pt-6 pb-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">
          Resultados de búsqueda para &quot;{decodedName}&quot;
        </h1>

        {loading && <GamesListSkeleton count={5} />}
        {error && <p className="text-center text-red-400 mt-10">{error}</p>}
        {!loading && !error && <GamesList games={games} />}
      </div>
    </main>
  );
}
