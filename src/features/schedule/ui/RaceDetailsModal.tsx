import { Modal } from "@/shared/ui";
import { F1Race } from "@/shared/api/types/f1Api";
import {
    formatRaceDateTime,
    getUserTimezoneInfo,
} from "@/shared/lib/utils/timeUtils";
import { SessionSchedule } from "./SessionSchedule";
import styles from "./RaceDetailsModal.module.scss";

interface RaceDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    race: F1Race | null;
}

export const RaceDetailsModal = ({
    isOpen,
    onClose,
    race,
}: RaceDetailsModalProps) => {
    if (!race) return null;

    const timezoneInfo = getUserTimezoneInfo();
    const raceDateTime = formatRaceDateTime(
        race.schedule.race.date,
        race.schedule.race.time
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`${
                race.raceName || `${race.circuit.circuitName} Grand Prix`
            }`}
            className={styles.raceModal}
        >
            <div className={styles.raceDetails}>
                {/* Circuit Information */}
                <div className={styles.circuitInfo}>
                    <h3 className={styles.sectionTitle}>Circuit Information</h3>
                    <div className={styles.circuitDetails}>
                        <div className={styles.circuitName}>
                            {race.circuit.circuitName}
                        </div>
                        <div className={styles.circuitLocation}>
                            {race.circuit.city}, {race.circuit.country}
                        </div>
                        <div className={styles.circuitStats}>
                            <div className={styles.stat}>
                                <span className={styles.statLabel}>
                                    Length:
                                </span>
                                <span className={styles.statValue}>
                                    {race.circuit.circuitLength} km
                                </span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statLabel}>
                                    Corners:
                                </span>
                                <span className={styles.statValue}>
                                    {race.circuit.corners}
                                </span>
                            </div>
                            {race.laps && (
                                <div className={styles.stat}>
                                    <span className={styles.statLabel}>
                                        Laps:
                                    </span>
                                    <span className={styles.statValue}>
                                        {race.laps}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Race Information */}
                <div className={styles.raceInfo}>
                    <h3 className={styles.sectionTitle}>Race Information</h3>
                    <div className={styles.raceDetails}>
                        <div className={styles.raceDateTime}>
                            <div className={styles.raceDate}>
                                {raceDateTime.date}
                            </div>
                            {raceDateTime.time && (
                                <div className={styles.raceTime}>
                                    {raceDateTime.time}
                                </div>
                            )}
                        </div>
                        <div className={styles.timezoneInfo}>
                            All times shown in your timezone:{" "}
                            {timezoneInfo.timezone}
                        </div>
                    </div>
                </div>

                {/* Winner Information (if completed) */}
                {race.winner && (
                    <div className={styles.winnerInfo}>
                        <h3 className={styles.sectionTitle}>Winner</h3>
                        <div className={styles.winnerDetails}>
                            <div className={styles.winnerName}>
                                {race.winner.name} {race.winner.surname}
                            </div>
                            {race.teamWinner && (
                                <div className={styles.winnerTeam}>
                                    {race.teamWinner.teamName}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Session Schedule */}
                <div className={styles.sessionSchedule}>
                    <h3 className={styles.sectionTitle}>Weekend Schedule</h3>
                    <SessionSchedule schedule={race.schedule} />
                </div>
            </div>
        </Modal>
    );
};
