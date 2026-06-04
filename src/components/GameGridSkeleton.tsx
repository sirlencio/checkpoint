import GameGridItemSkeleton from "./GameGridItemSkeleton";

const GameGridSkeleton = () => {
  return (
    <div className="p-4">
      {/* Título fake */}
      <div className="h-10 w-64 bg-gray-600 rounded mx-auto mb-8 animate-pulse" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 p-4">
        {Array.from({ length: 14 }).map((_: unknown, i: number) => (
          <GameGridItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default GameGridSkeleton;
