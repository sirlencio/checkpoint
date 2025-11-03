"use client";

import { useCallback, useEffect, useState } from "react";

export const useGames = (params = {}) => {

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const queryString = new URLSearchParams(params).toString();

    const fetchGames = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/games?${queryString}`);
            if (!res.ok) throw new Error("Error fetching games");

            const data = await res.json();
            setGames(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
        } finally {
            setLoading(false);
        }
    }, [queryString]);

    useEffect(() => {
        fetchGames();
    }, [fetchGames]);

    return { games, loading, error, refetch: fetchGames };
};
