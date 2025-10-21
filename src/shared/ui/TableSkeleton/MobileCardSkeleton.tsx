import styles from "./TableSkeleton.module.scss";

export const MobileCardSkeleton = () => {
    return (
        <div className={styles.mobileCardSkeleton}>
            <div className={styles.cardHeader}>
                <div className={styles.skeletonBadge} />
                <div className={styles.skeletonTitle} />
            </div>

            <div className={styles.cardContent}>
                <div className={styles.skeletonField}>
                    <div className={styles.skeletonLabel} />
                    <div className={styles.skeletonValue} />
                </div>

                <div className={styles.skeletonField}>
                    <div className={styles.skeletonLabel} />
                    <div className={styles.skeletonValue} />
                </div>

                <div className={styles.skeletonField}>
                    <div className={styles.skeletonLabel} />
                    <div className={styles.skeletonValue} />
                </div>
            </div>
        </div>
    );
};
