import GameGrid from "@/components/GamesGrid";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen pt-25 pb-6 ">
      <div className="self-start mb-12 max-w-2xl">
        <h2 className="text-6xl text-white font-bold mb-4  ">
          ¿No sabes cuál será tu próxima aventura?
        </h2>
        <p className=" text-2xl text-white font-semibold">
         ¡¡Descubre nuevos juegos, y sigue a los que te interesen!!
        </p>
      </div>

      <div className="w-full max-w-6xl">
        <GameGrid />
      </div>
    </main>
  );
}
