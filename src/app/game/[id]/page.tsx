"use client";

import { useGames } from "@/hooks/useGames";
import Image from "next/image";
import { YouTubeEmbed } from '@next/third-parties/google'
import { use } from "react";

export default function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params);
  const { games, loading, error } = useGames({ id: String(id) });

  const game = games.length > 0 ? games[0] : games[0];

  if (loading)
    return <p className="text-white text-center mt-10">Cargando...</p>;
  if (error) return <p className="text-red-400 text-center mt-10">{error}</p>;
  if (!game)
    return <p className="text-white text-center mt-10">Juego no encontrado</p>;

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-start text-white"
      style={{
        backgroundImage: `url(${game.cover?.url || "/placeholder.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Fondo difuminado */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl w-full mx-auto p-6 rounded-2xl bg-black/60 shadow-xl mt-20">
        <h1 className="text-5xl font-extrabold text-center mb-8">
          {game.name}
        </h1>

        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Portada */}
          <div className="w-64 flex-shrink-0">
            <Image
              src={game.cover?.url || "/placeholder.png"}
              alt={game.name}
              width={256}
              height={320}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Información */}
          <div className="space-y-4 text-gray-200 flex-1">
            <p className="text-lg leading-relaxed">{game.summary}</p>

            <p>
              <span className="text-green-400 font-semibold">
                Fecha de lanzamiento:
              </span>{" "}
              {game.first_release_date}
            </p>

            <p>
              <span className="text-green-400 font-semibold">Plataformas:</span>{" "}
              {game.platforms?.map((p) => p.name).join(", ") || "Desconocidas"}
            </p>

            <p>
              <span className="text-green-400 font-semibold">Géneros:</span>{" "}
              {game.genres?.map((g) => g.name).join(", ") || "Desconocidos"}
            </p>

            {game.rating && (
              <p>
                <span className="text-green-400 font-semibold">Rating:</span>{" "}
                {Math.round(game.rating)} / 100
              </p>
            )}

            {/* Video */}
            {game.videos?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-2 text-green-400">Trailer</h2>
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                  <YouTubeEmbed videoid={game.videos[0].video_id}/>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Capturas */}
        {game.screenshots?.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-green-400 text-center">Capturas</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {game.screenshots.map((s) => (
                <Image
                  key={s.id}
                  src={s.url}
                  alt={`Screenshot ${game.name}`}
                  width={400}
                  height={250}
                  className="rounded-lg shadow-md object-cover hover:scale-105 transition-transform"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
