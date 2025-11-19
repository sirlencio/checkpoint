"use client";

import { Game } from "@/types/game";
import { useState, useEffect, useCallback } from "react";

interface UseGamesParams {
  searchTerm?: string;
  id?: string | number;
}

export const useGames = ({ searchTerm, id }: UseGamesParams = {}) => {
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let endpoint = "";

      if (id) {
        endpoint = `/api/game/${id}`;
      } else if (searchTerm) {
        endpoint = `/api/games/${searchTerm}`;
      } else {
        endpoint = `/api/games/upcoming`;
      }

      console.log("Fetching games from:", endpoint);
      const res = await fetch(endpoint);

      if (res.status === 429) {
        throw new Error("Has superado el límite de peticiones. Inténtalo en unos segundos.");
      }

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Error al obtener los juegos");
      }

      const data = await res.json();

      setGames(Array.isArray(data) ? data : [data]); // Garantiza que siempre sea array
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
      setGames([]); // Evita que games sea null al render
    } finally {
      setLoading(false);
    }
  }, [id, searchTerm]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]); // Depende solo de id o searchTerm

  return { games, loading, error, refetch: fetchGames };
};
