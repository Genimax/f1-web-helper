import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import {
    fetchDriversChampionship,
    fetchConstructorsChampionship,
} from "@/shared/lib/store/slices/f1Slice";

export const useF1Data = () => {
    const dispatch = useAppDispatch();
    const { driversChampionship, constructorsChampionship } = useAppSelector(
        (state) => state.f1
    );

    useEffect(() => {
        // Загружаем данные при монтировании, если их еще нет
        if (!driversChampionship.data && !driversChampionship.loading) {
            dispatch(fetchDriversChampionship());
        }

        if (
            !constructorsChampionship.data &&
            !constructorsChampionship.loading
        ) {
            dispatch(fetchConstructorsChampionship());
        }
    }, [
        dispatch,
        driversChampionship.data,
        driversChampionship.loading,
        constructorsChampionship.data,
        constructorsChampionship.loading,
    ]);

    const refreshDriversChampionship = () => {
        dispatch(fetchDriversChampionship());
    };

    const refreshConstructorsChampionship = () => {
        dispatch(fetchConstructorsChampionship());
    };

    return {
        driversChampionship,
        constructorsChampionship,
        refreshDriversChampionship,
        refreshConstructorsChampionship,
    };
};
