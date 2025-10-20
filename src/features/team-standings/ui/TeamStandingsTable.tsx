import { Table } from "@/shared/ui";
import { Badge } from "@/shared/ui";
import { Team } from "@/entities/team/model/types";
import styles from "./TeamStandingsTable.module.scss";

interface TeamStandingsTableProps {
    teams: Team[];
}

export const TeamStandingsTable = ({ teams }: TeamStandingsTableProps) => {
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
        {
            key: "podiums",
            title: "Podiums",
            width: "100px",
            align: "center" as const,
        },
    ];

    const renderCell = (value: any, column: any, row: Team) => {
        switch (column.key) {
            case "position":
                return (
                    <Badge variant={row.position <= 3 ? "top" : "default"}>
                        {row.position}
                    </Badge>
                );

            case "team":
                return (
                    <div className={styles.teamInfo}>
                        <div
                            className={styles.teamColor}
                            style={{ backgroundColor: row.color }}
                        ></div>
                        <span className={styles.teamName}>{row.name}</span>
                    </div>
                );

            case "points":
                return (
                    <span className={styles.points}>
                        {row.points.toLocaleString()}
                    </span>
                );

            case "wins":
            case "podiums":
                return <span className={styles.stat}>{value}</span>;

            default:
                return value;
        }
    };

    return (
        <div className={styles.tableSection}>
            <div className={styles.tableHeader}>
                <h3>Constructor Standings</h3>
                <div className={styles.tableMeta}>
                    <span className={styles.season}>2024 Season</span>
                    <span className={styles.divider}>•</span>
                    <span className={styles.updated}>
                        Updated: Nov 26, 2024
                    </span>
                </div>
            </div>

            <Table
                columns={columns}
                data={teams}
                renderCell={renderCell}
                className={styles.table}
            />
        </div>
    );
};
