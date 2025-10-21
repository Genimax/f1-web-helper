import { Table, TableSkeleton, Button } from "@/shared/ui";
import { Badge } from "@/shared/ui";
import { F1Race } from "@/shared/api/types/f1Api";
import { useSchedule } from "@/shared/lib/f1/useSchedule";
import { useIsMobile } from "@/shared/lib/hooks/useMediaQuery";
import { ScheduleMobileCard } from "./index";
import {
    filterRaces,
    getRaceStatus,
    getStatusVariant,
    getStatusDisplayText,
    isRaceUpcoming,
    isNextRace,
} from "@/shared/lib/utils/scheduleUtils";
import { formatRaceDateTime } from "@/shared/lib/utils/timeUtils";
import { useState } from "react";
import styles from "./ScheduleTable.module.scss";

export const ScheduleTable = () => {
    const { schedule } = useSchedule();
    const isMobile = useIsMobile();
    const [showCompletedRaces, setShowCompletedRaces] = useState(false);

    const columns = [
        {
            key: "round",
            title: "Round",
            width: "80px",
            align: "center" as const,
        },
        {
            key: "raceName",
            title: "Race",
            width: "1fr",
        },
        {
            key: "raceDateTime",
            title: "Race Date & Time (your timezone)",
            width: "200px",
            align: "left" as const,
        },
        {
            key: "winner",
            title: "Winner",
            width: "180px",
            align: "left" as const,
        },
        {
            key: "status",
            title: "Status",
            width: "120px",
            align: "center" as const,
        },
    ];

    const handleToggleCompletedRaces = () => {
        setShowCompletedRaces(!showCompletedRaces);
    };

    const filteredRaces = schedule.data
        ? filterRaces(schedule.data, showCompletedRaces)
        : [];

    const renderCell = (value: any, column: any, row: F1Race) => {
        switch (column.key) {
            case "round":
                return <Badge variant="default">{row.round}</Badge>;

            case "raceName":
                return (
                    <div className={styles.raceInfo}>
                        <span className={styles.raceName}>
                            {row.raceName ||
                                `${row.circuit.circuitName} Grand Prix`}
                        </span>
                        <span className={styles.raceLocation}>
                            {row.circuit.city}, {row.circuit.country}
                        </span>
                    </div>
                );

            case "raceDateTime":
                const raceDateTime = formatRaceDateTime(
                    row.schedule.race.date,
                    row.schedule.race.time
                );

                return (
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
                );

            case "winner":
                const status = getRaceStatus(row);
                if (status === "completed" && row.winner) {
                    return (
                        <div className={styles.winnerInfo}>
                            <div className={styles.winnerName}>
                                {row.winner.name} {row.winner.surname}
                            </div>
                            {row.teamWinner && (
                                <div className={styles.winnerTeam}>
                                    {row.teamWinner.teamName}
                                </div>
                            )}
                        </div>
                    );
                }
                return (
                    <div className={styles.noWinner}>
                        {status === "completed" ? "TBD" : "-"}
                    </div>
                );

            case "status":
                const raceStatus = getRaceStatus(row);
                const statusText = getStatusDisplayText(raceStatus);
                return (
                    <div
                        className={`${styles.statusLabel} ${styles[raceStatus]}`}
                    >
                        <span>{statusText}</span>
                        <div className={styles.statusIcon}></div>
                    </div>
                );

            default:
                return value;
        }
    };

    if (schedule.loading) {
        return (
            <div className={styles.tableSection}>
                <div className={styles.tableHeader}>
                    <h3>Race Schedule</h3>
                    <div className={styles.tableMeta}>
                        <span className={styles.season}>Loading...</span>
                    </div>
                </div>
                <TableSkeleton rows={20} columns={6} />
            </div>
        );
    }

    if (schedule.error) {
        return (
            <div className={styles.tableSection}>
                <div className={styles.error}>
                    <p>Error loading data: {schedule.error}</p>
                </div>
            </div>
        );
    }

    if (!schedule.data || schedule.data.length === 0) {
        return (
            <div className={styles.tableSection}>
                <div className={styles.noData}>
                    <p>No schedule data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.tableSection}>
            <div className={styles.tableHeader}>
                <div className={styles.headerTop}>
                    <h3>Race Schedule</h3>
                    <Button
                        variant="secondary"
                        size="small"
                        onClick={handleToggleCompletedRaces}
                        className={styles.toggleButton}
                    >
                        {showCompletedRaces ? "Hide" : "Show"} Completed Races
                    </Button>
                </div>
                <div className={styles.tableMeta}>
                    <span className={styles.season}>
                        {schedule.season} Season
                    </span>
                    <span className={styles.divider}>•</span>
                    <span className={styles.updated}>
                        Updated:{" "}
                        {schedule.lastUpdated
                            ? new Date(
                                  schedule.lastUpdated
                              ).toLocaleDateString()
                            : "Unknown"}
                    </span>
                    <span className={styles.divider}>•</span>
                    <span className={styles.raceCount}>
                        Showing {filteredRaces.length} of{" "}
                        {schedule.data?.length || 0} races
                    </span>
                </div>
            </div>

            {isMobile ? (
                <div className={styles.mobileContainer}>
                    {filteredRaces.map((race) => (
                        <ScheduleMobileCard
                            key={race.raceId}
                            race={race}
                            isUpcoming={isRaceUpcoming(race)}
                            isNextRace={isNextRace(race, schedule.data || [])}
                        />
                    ))}
                </div>
            ) : (
                <Table
                    columns={columns}
                    data={filteredRaces}
                    renderCell={renderCell}
                    className={styles.table}
                    getRowClassName={(race) => {
                        if (isNextRace(race, schedule.data || [])) {
                            return styles.nextRaceRow;
                        }
                        if (isRaceUpcoming(race)) {
                            return styles.upcomingRaceRow;
                        }
                        return "";
                    }}
                />
            )}
        </div>
    );
};
