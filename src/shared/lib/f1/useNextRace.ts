import { useState, useEffect } from "react";
import { F1NextRaceResponse } from "@/shared/api/types/f1Api";

interface UseNextRaceReturn {
    data: F1NextRaceResponse | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useNextRace = (): UseNextRaceReturn => {
    const [data, setData] = useState<F1NextRaceResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNextRace = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch("/api/f1/next-race");

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNextRace();
    }, []);

    return {
        data,
        loading,
        error,
        refetch: fetchNextRace,
    };
};
