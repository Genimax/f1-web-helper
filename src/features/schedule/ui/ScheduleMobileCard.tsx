import { F1Race } from "@/shared/api/types/f1Api";
import { MobileCard } from "@/shared/ui";
import { formatRaceDateTime } from "@/shared/lib/utils/timeUtils";
import styles from "./ScheduleMobileCard.module.scss";

interface ScheduleMobileCardProps {
    race: F1Race;
    isUpcoming?: boolean;
    isNextRace?: boolean;
    onClick?: () => void;
}

export const ScheduleMobileCard = ({
    race,
    isUpcoming = false,
    isNextRace = false,
    onClick,
}: ScheduleMobileCardProps) => {
    const raceDateTime = formatRaceDateTime(
        race.schedule.race.date,
        race.schedule.race.time
    );

    return (
        <MobileCard
            className={`${styles.card} ${isNextRace ? styles.nextRace : ""} ${
                isUpcoming ? styles.upcomingRace : ""
            }`}
            onClick={onClick}
        >
            <div className={styles.cardHeader}>
                <div className={styles.raceDateTime}>
                    <div className={styles.raceDate}>{raceDateTime.date}</div>
                    {raceDateTime.time && (
                        <div className={styles.raceTime}>
                            {raceDateTime.time}
                        </div>
                    )}
                </div>
                <div className={styles.statusContainer}>
                    {isNextRace && (
                        <div className={styles.statusBadge}>NEXT RACE</div>
                    )}
                    {isUpcoming && !isNextRace && (
                        <div className={styles.statusBadge}>UPCOMING</div>
                    )}
                </div>
            </div>

            <div className={styles.cardContent}>
                <h4 className={styles.raceName}>
                    {race.raceName || `${race.circuit.circuitName} Grand Prix`}
                </h4>

                <div className={styles.circuitLocation}>
                    {race.circuit.city}, {race.circuit.country}
                </div>

                {race.winner && (
                    <div className={styles.winnerInfo}>
                        <div className={styles.winnerLabel}>Winner:</div>
                        <div className={styles.winnerName}>
                            {race.winner.name} {race.winner.surname}
                        </div>
                        <div className={styles.winnerTeam}>
                            {race.teamWinner?.teamName}
                        </div>
                    </div>
                )}

                {race.laps && (
                    <div className={styles.raceStats}>
                        <span className={styles.laps}>{race.laps} laps</span>
                    </div>
                )}
            </div>
        </MobileCard>
    );
};
