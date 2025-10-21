import { useIsMobile } from "@/shared/lib/hooks/useMediaQuery";
import { MobileCardSkeleton } from "./MobileCardSkeleton";
import styles from "./TableSkeleton.module.scss";

interface TableSkeletonProps {
    rows?: number;
    columns?: number;
    className?: string;
}

export const TableSkeleton = ({
    rows = 10,
    columns = 5,
    className = "",
}: TableSkeletonProps) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className={`${styles.mobileContainer} ${className}`}>
                {Array.from({ length: rows }).map((_, index) => (
                    <MobileCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    return (
        <div className={`${styles.tableSkeleton} ${className}`}>
            {/* Header skeleton */}
            <div className={styles.tableHead}>
                {Array.from({ length: columns }).map((_, index) => (
                    <div key={index} className={styles.skeletonHeaderCell} />
                ))}
            </div>

            {/* Body skeleton */}
            <div className={styles.tableBody}>
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className={styles.skeletonRow}>
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <div
                                key={colIndex}
                                className={styles.skeletonCell}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
