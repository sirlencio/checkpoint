const GameDetailSkeleton = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-black">
      {/* Fondo */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Contenedor principal */}
      <div className="relative z-10 max-w-6xl w-full mx-auto p-6 rounded-2xl bg-black/60 shadow-xl mt-20 animate-pulse">
        {/* Título */}
        <div className="h-12 w-3/4 bg-gray-600 rounded mx-auto mb-10" />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Portada */}
          <div className="w-64 h-[320px] bg-gray-600 rounded-lg flex-shrink-0" />

          {/* Info */}
          <div className="flex-1 space-y-4">
            {/* Summary fake */}
            <div className="h-4 bg-gray-500 rounded w-full" />
            <div className="h-4 bg-gray-500 rounded w-11/12" />
            <div className="h-4 bg-gray-500 rounded w-10/12" />

            {/* Datos */}
            <div className="h-4 bg-gray-500 rounded w-1/2 mt-4" />
            <div className="h-4 bg-gray-500 rounded w-2/3" />
            <div className="h-4 bg-gray-500 rounded w-1/3" />

            {/* Trailer */}
            <div className="mt-6">
              <div className="h-6 w-32 bg-gray-600 rounded mb-3" />
              <div className="aspect-video bg-gray-600 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Screenshots */}
        <div className="mt-10">
          <div className="h-6 w-40 bg-gray-600 rounded mx-auto mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-[180px] bg-gray-600 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailSkeleton;
