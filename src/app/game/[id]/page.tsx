"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Game } from "@/types/game";
import { ArrowLeft } from "lucide-react";
import { useGames } from "@/hooks/useGames";

export default function GameDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const {games, loading, error} = useGames({ id: String(id) });
  console.log(games);
  const game = games.length > 0 ? games[0] : games[0];
  if (loading) return <p className="text-white text-center mt-10">Cargando...</p>;
  if (error) return <p className="text-red-400 text-center mt-10">{error}</p>;
  if (!game) return <p className="text-white text-center mt-10">Juego no encontrado</p>;

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

      {/* Botón volver */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-lg bg-black/50 text-gray-200 hover:text-green-400 hover:bg-black/70 transition"
      >
        <ArrowLeft size={20} />
        <span>Volver</span>
      </button>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl w-full mx-auto p-6 rounded-2xl bg-black/60 shadow-xl mt-20">
        <h1 className="text-5xl font-extrabold text-center mb-8">{game.name}</h1>

        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Portada 
          <div className="w-64 flex-shrink-0">
            <Image
              src={game.cover?.url || "/placeholder.png"}
              alt={game.name}
              width={256}
              height={320}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>*/}

          {/* Información */}
          <div className="space-y-4 text-gray-200 flex-1">
            <p className="text-lg leading-relaxed">{game.summary}</p>

            <p>
              <span className="text-green-400 font-semibold">Fecha de lanzamiento:</span>{" "}
              {game.first_release_date
                ? new Date(game.first_release_date * 1000).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Desconocida"}
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
                <span className="text-green-400 font-semibold">Rating:</span> {Math.round(game.rating)} / 100
              </p>
            )}

            {/* Video 
            {game.videos?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-2 text-green-400">Trailer</h2>
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={game.videos[0].url.replace("youtu.be/", "www.youtube.com/embed/")}
                    title={game.name}
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            )}*/}
          </div>
        </div>

        {/* Capturas 
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
        )}*/}
      </div>
    </div>
  );
}
