import { F1Race } from "@/shared/api/types/f1Api";

export type RaceStatus = "completed" | "ongoing" | "upcoming" | "tbd";

export const getRaceStatus = (race: F1Race): RaceStatus => {
    const now = new Date();
    const raceDate = race.schedule.race.date
        ? new Date(race.schedule.race.date)
        : null;

    if (!raceDate) return "tbd";

    // Если есть победитель, гонка завершена
    if (race.winner) return "completed";

    // Если дата прошла и нет победителя - гонка завершена (данные еще не обновились)
    if (raceDate < now) return "completed";

    return "upcoming";
};

export const isRaceCompleted = (race: F1Race): boolean => {
    return getRaceStatus(race) === "completed";
};

export const isRaceUpcoming = (race: F1Race): boolean => {
    return getRaceStatus(race) === "upcoming";
};

export const getNextRace = (races: F1Race[]): F1Race | null => {
    const now = new Date();
    const upcomingRaces = races
        .filter((race) => {
            const raceDate = race.schedule.race.date
                ? new Date(race.schedule.race.date)
                : null;
            return raceDate && raceDate > now;
        })
        .sort((a, b) => {
            const dateA = new Date(a.schedule.race.date!);
            const dateB = new Date(b.schedule.race.date!);
            return dateA.getTime() - dateB.getTime();
        });

    return upcomingRaces.length > 0 ? upcomingRaces[0] : null;
};

export const isNextRace = (race: F1Race, races: F1Race[]): boolean => {
    const nextRace = getNextRace(races);
    return nextRace ? nextRace.raceId === race.raceId : false;
};

export const filterRaces = (
    races: F1Race[],
    showCompleted: boolean = false
): F1Race[] => {
    if (showCompleted) {
        return races;
    }

    // Показываем только будущие и текущие гонки
    return races.filter((race) => {
        const status = getRaceStatus(race);
        return (
            status === "upcoming" || status === "ongoing" || status === "tbd"
        );
    });
};

export const getStatusVariant = (
    status: RaceStatus
): "success" | "warning" | "info" | "secondary" => {
    switch (status) {
        case "completed":
            return "success";
        case "ongoing":
            return "warning";
        case "upcoming":
            return "info";
        default:
            return "secondary";
    }
};

export const getStatusDisplayText = (status: RaceStatus): string => {
    switch (status) {
        case "completed":
            return "Completed";
        case "ongoing":
            return "Ongoing";
        case "upcoming":
            return "Upcoming";
        default:
            return "TBD";
    }
};
