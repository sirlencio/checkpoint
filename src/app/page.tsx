import GameGrid from "@/components/GamesGrid";
import AboutCheckPoint from "@/components/AboutCheckPoint";
import CallToAction from "@/components/CallToAction";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen pt-25 pb-6 ">
      <div className="self-start mb-12 max-w-2xl">
        <h2 className="text-6xl text-white font-bold mb-4 drop-shadow-[2px_2px_2px_black]">
          ¿No sabes cuál será tu próxima aventura?
        </h2>
        <p className=" text-2xl text-white font-semibold drop-shadow-[2px_2px_2px_black]">
         ¡¡Descubre nuevos juegos, y sigue a los que te interesen!!
        </p>
        <CallToAction />
      </div>

      <div className="w-full max-w-[1600px] mb-14">
        <GameGrid />
      </div>
      <AboutCheckPoint />
    </main>
  );
}
