import { F1ConstructorChampionshipEntry } from "@/shared/api/types/f1Api";
import { Badge, MobileCard } from "@/shared/ui";
import styles from "./TeamMobileCard.module.scss";

interface TeamMobileCardProps {
    team: F1ConstructorChampionshipEntry;
}

export const TeamMobileCard = ({ team }: TeamMobileCardProps) => {
    return (
        <MobileCard className={styles.teamCard}>
            <div className={styles.cardHeader}>
                <div className={styles.position}>
                    <Badge
                        variant={
                            team.position && team.position <= 3
                                ? "top"
                                : "default"
                        }
                    >
                        {team.position || "-"}
                    </Badge>
                </div>
                <div className={styles.teamInfo}>
                    <h4 className={styles.teamName}>{team.team.teamName}</h4>
                    <p className={styles.teamCountry}>{team.team.country}</p>
                </div>
            </div>

            <div className={styles.cardContent}>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Points</span>
                        <span className={styles.statValue}>
                            {team.points.toLocaleString()}
                        </span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Wins</span>
                        <span className={styles.statValue}>{team.wins}</span>
                    </div>
                </div>
            </div>
        </MobileCard>
    );
};
