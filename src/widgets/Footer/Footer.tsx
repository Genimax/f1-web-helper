import styles from "./Footer.module.scss";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <div className={styles.footerInfo}>
                        <p>
                            Data provided by the service:{" "}
                            <a
                                href="https://f1api.dev/api"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                F1 API
                            </a>
                        </p>
                    </div>
                    <div className={styles.footerLinks}>
                        <a
                            href="https://github.com/Genimax"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Developed by Genimax
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
