import { F1Schedule } from "@/shared/api/types/f1Api";
import { formatRaceDateTime } from "@/shared/lib/utils/timeUtils";
import { getSessionTypeInfo } from "@/shared/lib/utils/sessionUtils";
import styles from "./SessionSchedule.module.scss";

interface SessionScheduleProps {
    schedule: F1Schedule;
}

interface SessionInfo {
    key: string;
    name: string;
    date: string | null;
    time: string | null;
    type: "practice" | "qualifying" | "sprint" | "race";
    isActive: boolean;
}

export const SessionSchedule = ({ schedule }: SessionScheduleProps) => {
    const sessions: SessionInfo[] = [
        {
            key: "fp1",
            name: "Free Practice 1",
            date: schedule.fp1.date,
            time: schedule.fp1.time,
            type: "practice",
            isActive: true,
        },
        {
            key: "fp2",
            name: "Free Practice 2",
            date: schedule.fp2.date,
            time: schedule.fp2.time,
            type: "practice",
            isActive: true,
        },
        {
            key: "fp3",
            name: "Free Practice 3",
            date: schedule.fp3.date,
            time: schedule.fp3.time,
            type: "practice",
            isActive: true,
        },
        {
            key: "qualy",
            name: "Qualifying",
            date: schedule.qualy.date,
            time: schedule.qualy.time,
            type: "qualifying",
            isActive: true,
        },
        {
            key: "sprintQualy",
            name: "Sprint Qualifying",
            date: schedule.sprintQualy.date,
            time: schedule.sprintQualy.time,
            type: "qualifying",
            isActive: !!schedule.sprintQualy.date,
        },
        {
            key: "sprintRace",
            name: "Sprint Race",
            date: schedule.sprintRace.date,
            time: schedule.sprintRace.time,
            type: "sprint",
            isActive: !!schedule.sprintRace.date,
        },
        {
            key: "race",
            name: "Race",
            date: schedule.race.date,
            time: schedule.race.time,
            type: "race",
            isActive: true,
        },
    ];

    const activeSessions = sessions.filter((session) => session.isActive);

    return (
        <div className={styles.sessionSchedule}>
            <div className={styles.sessionsList}>
                {activeSessions.map((session) => {
                    const sessionInfo = getSessionTypeInfo(session.type);
                    const dateTime = formatRaceDateTime(
                        session.date,
                        session.time
                    );

                    return (
                        <div
                            key={session.key}
                            className={`${styles.sessionItem} ${
                                session.type === "race"
                                    ? styles.raceSession
                                    : ""
                            }`}
                        >
                            <div className={styles.sessionHeader}>
                                <div className={styles.sessionName}>
                                    {session.name}
                                </div>
                                <div className={styles.sessionType}>
                                    <span
                                        className={`${styles.typeBadge} ${
                                            styles[sessionInfo.variant]
                                        }`}
                                    >
                                        {sessionInfo.label}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.sessionDateTime}>
                                <div className={styles.sessionDate}>
                                    {dateTime.date}
                                </div>
                                {dateTime.time && (
                                    <div className={styles.sessionTime}>
                                        {dateTime.time}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {activeSessions.some((session) => !session.isActive) && (
                <div className={styles.note}>
                    <span className={styles.noteIcon}>ℹ️</span>
                    <span>
                        Some sessions may not be available for this race
                        weekend.
                    </span>
                </div>
            )}
        </div>
    );
};
