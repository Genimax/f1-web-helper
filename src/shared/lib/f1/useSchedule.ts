import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks";
import { fetchSchedule } from "@/shared/lib/store/slices/f1Slice";

export const useSchedule = () => {
    const dispatch = useAppDispatch();
    const { schedule } = useAppSelector((state) => state.f1);
    const hasRequested = useRef(false);

    useEffect(() => {
        // Загружаем данные при монтировании, если их еще нет
        if (
            !schedule.data &&
            !schedule.loading &&
            !schedule.error &&
            !hasRequested.current
        ) {
            hasRequested.current = true;
            dispatch(fetchSchedule());
        }
    }, [dispatch, schedule.data, schedule.loading, schedule.error]);

    const refreshSchedule = () => {
        hasRequested.current = false;
        dispatch(fetchSchedule());
    };

    return {
        schedule,
        refreshSchedule,
    };
};
