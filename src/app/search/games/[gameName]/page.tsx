"use client";

import React from "react";
import { useGames } from "@/hooks/useGames";
import GameList from "@/components/GameList";

interface Props {
  params: Promise<{ gameName: string }>;
}

export default function SearchPage({ params }: Props) {
  const { gameName } = React.use(params);

  const decodedName = decodeURIComponent(gameName);

  const { games, loading, error } = useGames({ searchTerm: decodedName });

  return (
    <main className="min-h-screen bg-gray-900 text-white pt-6 pb-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">
          Resultados de búsqueda para &quot;{decodedName}&quot;
        </h1>

        {loading && <p className="text-center text-white mt-10">Cargando...</p>}
        {error && <p className="text-center text-red-400 mt-10">{error}</p>}

        {!loading && !error && <GameList games={games} />}
      </div>
    </main>
  );
}
