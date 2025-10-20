import { ReactNode } from "react";
import styles from "./Table.module.scss";

interface TableColumn {
    key: string;
    title: string;
    width?: string;
    align?: "left" | "center" | "right";
}

interface TableProps<T = Record<string, any>> {
    columns: TableColumn[];
    data: T[];
    renderCell?: (value: any, column: TableColumn, row: T) => ReactNode;
    className?: string;
}

export const Table = <T extends Record<string, any>>({
    columns,
    data,
    renderCell,
    className = "",
}: TableProps<T>) => {
    const tableClasses = [styles.table, className].filter(Boolean).join(" ");

    // Создаем grid-template-columns на основе колонок
    const gridTemplateColumns = columns
        .map((col) => col.width || "1fr")
        .join(" ");

    return (
        <div className={tableClasses}>
            <div className={styles.tableHead} style={{ gridTemplateColumns }}>
                {columns.map((column) => (
                    <div
                        key={column.key}
                        className={styles.tableHeaderCell}
                        style={{
                            textAlign: column.align || "left",
                        }}
                    >
                        {column.title}
                    </div>
                ))}
            </div>

            <div className={styles.tableBody}>
                {data.map((row, index) => {
                    // Определяем, является ли строка топ-3 позицией
                    const isTopThree =
                        (row as any).position && (row as any).position <= 3;
                    const position = (row as any).position;

                    const getRowClassName = () => {
                        if (!isTopThree) return styles.tableRow;

                        switch (position) {
                            case 1:
                                return `${styles.tableRow} ${styles.goldRow}`;
                            case 2:
                                return `${styles.tableRow} ${styles.silverRow}`;
                            case 3:
                                return `${styles.tableRow} ${styles.bronzeRow}`;
                            default:
                                return styles.tableRow;
                        }
                    };

                    return (
                        <div
                            key={index}
                            className={getRowClassName()}
                            style={{ gridTemplateColumns }}
                        >
                            {columns.map((column) => (
                                <div
                                    key={column.key}
                                    className={styles.tableCell}
                                    style={{
                                        textAlign: column.align || "left",
                                    }}
                                    data-label={column.title}
                                >
                                    {renderCell
                                        ? renderCell(
                                              row[column.key as keyof T],
                                              column,
                                              row
                                          )
                                        : row[column.key as keyof T]}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
