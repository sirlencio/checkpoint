const GameGridItemSkeleton = () => {
  return (
    <div className="relative w-full h-[350px] bg-gray-700 rounded-2xl overflow-hidden animate-pulse">
      {/* Imagen fake */}
      <div className="absolute inset-0 bg-gray-600" />

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="h-5 bg-gray-500 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-500 rounded w-1/2" />
      </div>
    </div>
  );
};

export default GameGridItemSkeleton;
