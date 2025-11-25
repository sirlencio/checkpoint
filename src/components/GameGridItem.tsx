import { Game } from "@/types/game";
import Image from "next/image";
import Link from "next/link";

interface Props {
  game: Game;
}
const GameGridItem = ({ game }: Props) => {
  return (
    <Link
      key={game.id}
      href={`/game/${game.id}`}
      className="relative w-full h-[350px] bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
    >
      {game.cover?.url ? (
        <Image
          src={game.cover.url}
          alt={game.name}
          fill
          className="object-cover opacity-80"
        />
      ) : (
        <div className="bg-gray-700 w-full h-full flex items-center justify-center text-gray-300">
          Sin imagen
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-lg font-bold text-white">{game.name}</h3>

        {game.total_rating && (
          <p className="text-sm text-gray-300 mt-1">
            ⭐ {Math.round(game.total_rating)} / 100
          </p>
        )}
      </div>
    </Link>
  );
};

export default GameGridItem;
