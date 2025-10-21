import { F1Race } from "@/shared/api/types/f1Api";
import { Badge } from "@/shared/ui";
import { MobileCard } from "@/shared/ui";
import styles from "./ScheduleMobileCard.module.scss";

interface ScheduleMobileCardProps {
    race: F1Race;
}

export const ScheduleMobileCard = ({ race }: ScheduleMobileCardProps) => {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return "TBD";
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const getRaceStatus = () => {
        const now = new Date();
        const raceDate = race.schedule.race.date
            ? new Date(race.schedule.race.date)
            : null;

        if (!raceDate) return "TBD";

        if (race.winner) return "Completed";
        if (raceDate < now) return "Ongoing";
        return "Upcoming";
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "Completed":
                return "success";
            case "Ongoing":
                return "warning";
            case "Upcoming":
                return "info";
            default:
                return "secondary";
        }
    };

    const status = getRaceStatus();

    return (
        <MobileCard className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.roundInfo}>
                    <Badge variant="secondary" className={styles.roundBadge}>
                        Round {race.round}
                    </Badge>
                    <Badge
                        variant={getStatusVariant(status)}
                        className={styles.statusBadge}
                    >
                        {status}
                    </Badge>
                </div>
                <div className={styles.raceDate}>
                    {formatDate(race.schedule.race.date)}
                </div>
            </div>

            <div className={styles.cardContent}>
                <h4 className={styles.raceName}>
                    {race.raceName || `${race.circuit.circuitName} Grand Prix`}
                </h4>

                <div className={styles.circuitInfo}>
                    <div className={styles.circuitName}>
                        {race.circuit.circuitName}
                    </div>
                    <div className={styles.circuitLocation}>
                        {race.circuit.city}, {race.circuit.country}
                    </div>
                    <div className={styles.circuitDetails}>
                        <span className={styles.circuitLength}>
                            {race.circuit.circuitLength}
                        </span>
                        <span className={styles.circuitCorners}>
                            {race.circuit.corners} corners
                        </span>
                    </div>
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
