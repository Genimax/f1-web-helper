import { Table, TableSkeleton } from "@/shared/ui";
import { Badge } from "@/shared/ui";
import { F1Race } from "@/shared/api/types/f1Api";
import { useSchedule } from "@/shared/lib/f1/useSchedule";
import { useIsMobile } from "@/shared/lib/hooks/useMediaQuery";
import { ScheduleMobileCard } from "./ScheduleMobileCard";
import styles from "./ScheduleTable.module.scss";

export const ScheduleTable = () => {
    const { schedule } = useSchedule();
    const isMobile = useIsMobile();

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
            key: "circuit",
            title: "Circuit",
            width: "200px",
        },
        {
            key: "country",
            title: "Country",
            width: "120px",
        },
        {
            key: "raceDate",
            title: "Race Date",
            width: "120px",
            align: "center" as const,
        },
        {
            key: "status",
            title: "Status",
            width: "100px",
            align: "center" as const,
        },
    ];

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    const getRaceStatus = (race: F1Race) => {
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

    const renderCell = (value: any, column: any, row: F1Race) => {
        switch (column.key) {
            case "round":
                return <Badge variant="secondary">{row.round}</Badge>;

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

            case "circuit":
                return (
                    <div className={styles.circuitInfo}>
                        <span className={styles.circuitName}>
                            {row.circuit.circuitName}
                        </span>
                        <span className={styles.circuitLength}>
                            {row.circuit.circuitLength}
                        </span>
                    </div>
                );

            case "country":
                return (
                    <span className={styles.country}>
                        {row.circuit.country}
                    </span>
                );

            case "raceDate":
                return (
                    <span className={styles.raceDate}>
                        {formatDate(row.schedule.race.date)}
                    </span>
                );

            case "status":
                const status = getRaceStatus(row);
                return (
                    <Badge variant={getStatusVariant(status)}>{status}</Badge>
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
                <h3>Race Schedule</h3>
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
                </div>
            </div>

            {isMobile ? (
                <div className={styles.mobileContainer}>
                    {schedule.data.map((race) => (
                        <ScheduleMobileCard key={race.raceId} race={race} />
                    ))}
                </div>
            ) : (
                <Table
                    columns={columns}
                    data={schedule.data}
                    renderCell={renderCell}
                    className={styles.table}
                />
            )}
        </div>
    );
};
