"use client";

import { SearchGame } from "@/types/game";
import Image from "next/image";
import Link from "next/link";

interface Props {
  game: SearchGame;
}

export default function GameItem({ game }: Props) {
  return (
    <Link href={`/game/${game.id}`} className="w-full">
    <div className="flex bg-gray-800 rounded-2xl overflow-hidden shadow-lg p-4 w-full max-w-4xl mx-auto mb-6 hover:scale-105 transition-transform duration-300 gap-6">

      {/* 📌 Imagen a la izquierda */}
      {game.cover?.url ? (
        <div className="relative w-40 h-64 flex-shrink-0">
          <Image
            src={game.cover.url}
            alt={game.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      ) : (
        <div className="bg-gray-700 w-40 h-64 flex items-center justify-center text-gray-300 rounded-lg flex-shrink-0">
          Sin imagen
        </div>
      )}

      {/* 📌 Contenido a la derecha */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-3xl font-bold text-white mb-3">{game.name}</h2>

          <p className="text-lg text-gray-200 mb-3">{game.summary}</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-300 mt-4">
          {game.genres?.length > 0 && (
            <span>🎮 Géneros: {game.genres.map(g => g.name).join(", ")}</span>
          )}
          {game.platforms?.length > 0 && (
            <span>🖥️ Plataformas: {game.platforms.map(p => p.name).join(", ")}</span>
          )}
          {game.rating && <span>⭐ Rating: {Math.round(game.rating)} / 100</span>}
        </div>
      </div>

    </div>
    </Link>
  );
}
