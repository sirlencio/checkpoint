export default function AboutCheckPoint() {
  return (
    <section className="w-full py-20 px-6 ">
      <div className="max-w-5xl">

        <h2 className="text-6xl font-extrabold text-white mb-6 drop-shadow-[2px_2px_2px_black]">
          ¿Qué es CheckPoint?
        </h2>

        <p className="text-lg font-bold text-gray-300 leading-relaxed mb-12 max-w-3xl drop-shadow-[2px_2px_2px_black]">
          CheckPoint es un tracker creado por 2 amigos (Sirlencio y Nelius) y 1 maricón (Vandhal) para descubrir, seguir y organizar tus videojuegos favoritos.
          Aquí podrás explorar nuevos títulos, ver sus valoraciones, y llevar un control de los juegos que te interesan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="bg-gray-800 rounded-xl p-8 shadow-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-white mb-4">🎮 Descubre Juegos</h3>
            <p className="text-gray-300 text-sm">
              Amplia tu catálogo personal con recomendaciones de los títulos más populares.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-white mb-4">⭐ Valoraciones</h3>
            <p className="text-gray-300 text-sm">
              Consulta puntuaciones reales para elegir siempre la mejor experiencia.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-white mb-4">📌 Guarda tus favoritos</h3>
            <p className="text-gray-300 text-sm">
              Sigue los juegos que más te gusten y haz un seguimiento de tus aventuras.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
