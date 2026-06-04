import GameGrid from "@/components/GamesGrid";
import AboutCheckPoint from "@/components/AboutCheckPoint";
import CallToAction from "@/components/CallToAction";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* HERO + GAME GRID CON FONDO */}
      <section className="relative w-full flex flex-col items-left rounded-2xl justify-center overflow-hidden">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-[url('https://external-preview.redd.it/high-resolution-titanfall-2-keyart-dont-thank-me-v0-Ptih7n4gBY78usG0q3XwgjJqrtJW14SNzKUYDArEr4I.jpg?auto=webp&s=47389e3865f1dc5cb5b387b12aa03c0730218361')] 
                        bg-cover bg-center bg-no-repeat"
        />

       

        {/* Contenido */}
        <div
          className="relative z-10 w-full max-w-[1600px] 
                        px-6 sm:px-10 lg:px-16
                        pt-20 sm:pt-24 lg:pt-28
                        pb-14 flex flex-col"
        >
          {/* Hero text */}
          <div className="mb-12 max-w-3xl">
            <h2
              className="
              text-3xl 
              sm:text-4xl 
              md:text-5xl 
              lg:text-6xl 
              text-white font-bold mb-4
              drop-shadow-[2px_2px_4px_black]
            "
            >
              ¿No sabes cuál será tu próxima aventura?
            </h2>

            <p
              className="
              text-lg 
              sm:text-xl 
              md:text-2xl 
              text-white font-semibold
              drop-shadow-[1px_1px_3px_black]
            "
            >
              ¡¡Descubre nuevos juegos, y sigue a los que te interesen!!
            </p>

            <div className="mt-6">
              <CallToAction />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN SIN FONDO */}
      <section className="w-full px-6 sm:px-10 lg:px-16 py-16">
        <GameGrid />
        <AboutCheckPoint />
      </section>
    </main>
  );
}
