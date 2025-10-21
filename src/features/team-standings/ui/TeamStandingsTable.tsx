import { Table, TableSkeleton } from "@/shared/ui";
import { Badge } from "@/shared/ui";
import { F1ConstructorChampionshipEntry } from "@/shared/api/types/f1Api";
import { useF1Data } from "@/shared/lib/f1/useF1Data";
import { useIsMobile } from "@/shared/lib/hooks/useMediaQuery";
import { getPositionVariant } from "@/shared/lib";
import { TeamMobileCard } from "./TeamMobileCard";
import styles from "./TeamStandingsTable.module.scss";

export const TeamStandingsTable = () => {
    const { constructorsChampionship } = useF1Data();
    const isMobile = useIsMobile();

    const columns = [
        {
            key: "position",
            title: "Pos",
            width: "60px",
            align: "center" as const,
        },
        { key: "team", title: "Team", width: "1fr" },
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
        row: F1ConstructorChampionshipEntry
    ) => {
        switch (column.key) {
            case "position":
                return (
                    <Badge variant={getPositionVariant(row.position)}>
                        {row.position || "-"}
                    </Badge>
                );

            case "team":
                return (
                    <div className={styles.teamInfo}>
                        <span className={styles.teamName}>
                            {row.team.teamName}
                        </span>
                        <span className={styles.teamCountry}>
                            {row.team.country}
                        </span>
                    </div>
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

    if (constructorsChampionship.loading) {
        return (
            <div className={styles.tableSection}>
                <div className={styles.tableHeader}>
                    <h3>Constructor Standings</h3>
                    <div className={styles.tableMeta}>
                        <span className={styles.season}>Loading...</span>
                    </div>
                </div>
                <TableSkeleton rows={10} columns={4} />
            </div>
        );
    }

    if (constructorsChampionship.error) {
        return (
            <div className={styles.tableSection}>
                <div className={styles.error}>
                    <p>Error loading data: {constructorsChampionship.error}</p>
                </div>
            </div>
        );
    }

    if (
        !constructorsChampionship.data ||
        constructorsChampionship.data.length === 0
    ) {
        return (
            <div className={styles.tableSection}>
                <div className={styles.noData}>
                    <p>No constructors championship data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.tableSection}>
            <div className={styles.tableHeader}>
                <h3>Constructor Standings</h3>
                <div className={styles.tableMeta}>
                    <span className={styles.season}>
                        {constructorsChampionship.season} Season
                    </span>
                    <span className={styles.divider}>•</span>
                    <span className={styles.updated}>
                        Updated:{" "}
                        {constructorsChampionship.lastUpdated
                            ? new Date(
                                  constructorsChampionship.lastUpdated
                              ).toLocaleDateString()
                            : "Unknown"}
                    </span>
                </div>
            </div>

            {isMobile ? (
                <div className={styles.mobileContainer}>
                    {constructorsChampionship.data.map((team) => (
                        <TeamMobileCard key={team.teamId} team={team} />
                    ))}
                </div>
            ) : (
                <Table
                    columns={columns}
                    data={constructorsChampionship.data}
                    renderCell={renderCell}
                    className={styles.table}
                />
            )}
        </div>
    );
};
