import { ThemeToggle } from "@/shared/ui";
import styles from "./Header.module.scss";

import Image from "next/image";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerBackground}></div>
            <div className={styles.container}>
                <div className={styles.headerContent}>
                    <div className={styles.logo}>
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={50}
                            height={50}
                        />
                        <div className={styles.logoText}>
                            <h1>F1 Web Helper</h1>
                            <p>Fans' Formula 1 Information Portal</p>
                        </div>
                    </div>

                    <div className={styles.headerActions}>
                        <ThemeToggle />
                        <div className={styles.headerStats}>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>24</span>
                                <span className={styles.statLabel}>Races</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>20</span>
                                <span className={styles.statLabel}>
                                    Drivers
                                </span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>10</span>
                                <span className={styles.statLabel}>Teams</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
