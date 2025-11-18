"use client";

import { Game } from "@/types/game";
import { useCallback, useEffect, useState } from "react";

const API_URL = "http://localhost:4000/api";

interface UseGamesParams {
  searchTerm?: string;
  id?: string | number;
}

export const useGames = ({ searchTerm, id }: UseGamesParams = {}) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let endpoint = "";

      if (id) {
        // Si recibimos un ID, buscamos ese juego concreto
        endpoint = `${API_URL}/game/${id}`;
      } else if (searchTerm) {
        // Si recibimos un término de búsqueda, buscamos por nombre
        endpoint = `${API_URL}/games/${encodeURIComponent(searchTerm)}`;
      } else {
        // Si no, traemos los juegos destacados
        endpoint = `${API_URL}/games`;
      }
      console.log("Fetching from endpoint:", endpoint);
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Error al obtener los juegos");

      const data = await res.json();

      // Si buscamos por ID, la API devuelve un array con un solo juego
      setGames(Array.isArray(data) ? data : [data]);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setLoading(false);
    }
  }, [searchTerm, id]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return { games, loading, error, refetch: fetchGames };
};
