import { Table } from "@/shared/ui";
import { Badge } from "@/shared/ui";
import { F1DriverChampionshipEntry } from "@/shared/api/types/f1Api";
import { useF1Data } from "@/shared/lib/f1/useF1Data";
import { useIsMobile } from "@/shared/lib/hooks/useMediaQuery";
import { DriverMobileCard } from "./DriverMobileCard";
import styles from "./DriverStandingsTable.module.scss";

export const DriverStandingsTable = () => {
    const { driversChampionship } = useF1Data();
    const isMobile = useIsMobile();

    const columns = [
        {
            key: "position",
            title: "Pos",
            width: "60px",
            align: "center" as const,
        },
        { key: "driver", title: "Driver", width: "1fr" },
        { key: "team", title: "Team", width: "200px" },
        {
            key: "points",
            title: "Points",
            width: "100px",
            align: "center" as const,
        },
        {
            key: "wins",
            title: "Wins",
            width: "100px",
            align: "center" as const,
        },
    ];

    const renderCell = (
        value: any,
        column: any,
        row: F1DriverChampionshipEntry
    ) => {
        switch (column.key) {
            case "position":
                return (
                    <Badge
                        variant={
                            row.position && row.position <= 3
                                ? "top"
                                : "default"
                        }
                    >
                        {row.position || "-"}
                    </Badge>
                );

            case "driver":
                return (
                    <div className={styles.driverInfo}>
                        <span className={styles.driverName}>
                            {row.driver.name} {row.driver.surname}
                        </span>
                        <span className={styles.driverShortName}>
                            {row.driver.shortName}
                        </span>
                    </div>
                );

            case "team":
                return (
                    <span className={styles.teamName}>{row.team.teamName}</span>
                );

            case "points":
                return (
                    <span className={styles.points}>
                        {row.points.toLocaleString()}
                    </span>
                );

            case "wins":
                return <span className={styles.wins}>{row.wins}</span>;

            default:
                return value;
        }
    };

    if (driversChampionship.loading) {
        return (
            <div className={styles.tableSection}>
                <div className={styles.loading}>
                    <p>Loading drivers championship data...</p>
                </div>
            </div>
        );
    }

    if (driversChampionship.error) {
        return (
            <div className={styles.tableSection}>
                <div className={styles.error}>
                    <p>Error loading data: {driversChampionship.error}</p>
                </div>
            </div>
        );
    }

    if (!driversChampionship.data || driversChampionship.data.length === 0) {
        return (
            <div className={styles.tableSection}>
                <div className={styles.noData}>
                    <p>No drivers championship data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.tableSection}>
            <div className={styles.tableHeader}>
                <h3>Driver Standings</h3>
                <div className={styles.tableMeta}>
                    <span className={styles.season}>
                        {driversChampionship.season} Season
                    </span>
                    <span className={styles.divider}>•</span>
                    <span className={styles.updated}>
                        Updated:{" "}
                        {driversChampionship.lastUpdated
                            ? new Date(
                                  driversChampionship.lastUpdated
                              ).toLocaleDateString()
                            : "Unknown"}
                    </span>
                </div>
            </div>

            {isMobile ? (
                <div className={styles.mobileContainer}>
                    {driversChampionship.data.map((driver) => (
                        <DriverMobileCard
                            key={driver.driverId}
                            driver={driver}
                        />
                    ))}
                </div>
            ) : (
                <Table
                    columns={columns}
                    data={driversChampionship.data}
                    renderCell={renderCell}
                    className={styles.table}
                />
            )}
        </div>
    );
};
