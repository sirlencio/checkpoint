const GamesListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="flex flex-col items-center px-4 py-6 space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex bg-gray-800 rounded-2xl overflow-hidden shadow-lg p-4 w-full max-w-4xl mx-auto gap-6 animate-pulse"
        >
          {/* Imagen a la izquierda */}
          <div className="w-40 h-64 bg-gray-700 rounded-lg flex-shrink-0" />

          {/* Contenido a la derecha */}
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div className="h-8 bg-gray-600 rounded w-3/4" /> {/* Título */}
            <div className="h-4 bg-gray-500 rounded w-1/2" /> {/* Línea de descripción */}
            <div className="h-4 bg-gray-500 rounded w-1/3" /> {/* Otra línea */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GamesListSkeleton;
