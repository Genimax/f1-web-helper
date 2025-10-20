import { Table } from "@/shared/ui";
import { Badge } from "@/shared/ui";
import { Driver } from "@/entities/driver/model/types";
import styles from "./DriverStandingsTable.module.scss";

interface DriverStandingsTableProps {
    drivers: Driver[];
}

export const DriverStandingsTable = ({
    drivers,
}: DriverStandingsTableProps) => {
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
        {
            key: "podiums",
            title: "Podiums",
            width: "100px",
            align: "center" as const,
        },
    ];

    const renderCell = (value: any, column: any, row: Driver) => {
        switch (column.key) {
            case "position":
                return (
                    <Badge variant={row.position <= 3 ? "top" : "default"}>
                        {row.position}
                    </Badge>
                );

            case "driver":
                return (
                    <div className={styles.driverInfo}>
                        <span className={styles.driverFlag}>{row.flag}</span>
                        <span className={styles.driverName}>{row.name}</span>
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
                <h3>Driver Standings</h3>
                <div className={styles.tableMeta}>
                    <span className={styles.season}>2024 Season</span>
                    <span className={styles.divider}>•</span>
                    <span className={styles.updated}>
                        Updated: Nov 26, 2024
                    </span>
                </div>
            </div>

            <Table<Driver>
                columns={columns}
                data={drivers}
                renderCell={renderCell}
                className={styles.table}
            />
        </div>
    );
};
