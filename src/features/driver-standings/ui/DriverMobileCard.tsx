import { F1DriverChampionshipEntry } from "@/shared/api/types/f1Api";
import { Badge, MobileCard } from "@/shared/ui";
import styles from "./DriverMobileCard.module.scss";

interface DriverMobileCardProps {
    driver: F1DriverChampionshipEntry;
}

export const DriverMobileCard = ({ driver }: DriverMobileCardProps) => {
    return (
        <MobileCard className={styles.driverCard}>
            <div className={styles.cardHeader}>
                <div className={styles.position}>
                    <Badge
                        variant={
                            driver.position && driver.position <= 3
                                ? "top"
                                : "default"
                        }
                    >
                        {driver.position || "-"}
                    </Badge>
                </div>
                <div className={styles.driverInfo}>
                    <h4 className={styles.driverName}>
                        {driver.driver.name} {driver.driver.surname}
                    </h4>
                    <p className={styles.driverShortName}>
                        {driver.driver.shortName}
                    </p>
                </div>
            </div>

            <div className={styles.cardContent}>
                <div className={styles.teamInfo}>
                    <span className={styles.teamLabel}>Team</span>
                    <span className={styles.teamName}>
                        {driver.team.teamName}
                    </span>
                </div>

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Points</span>
                        <span className={styles.statValue}>
                            {driver.points.toLocaleString()}
                        </span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Wins</span>
                        <span className={styles.statValue}>{driver.wins}</span>
                    </div>
                </div>
            </div>
        </MobileCard>
    );
};
