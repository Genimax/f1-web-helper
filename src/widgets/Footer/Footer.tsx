import styles from "./Footer.module.scss";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <div className={styles.footerInfo}>
                        <p>
                            Данные предоставлены сервисом:{" "}
                            <a
                                href="https://f1api.dev/api"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                F1 API
                            </a>
                        </p>
                        {/* <p>© 2025 F1 Web Helper.</p> */}
                    </div>
                    <div className={styles.footerLinks}>
                        <a
                            href="https://github.com/Genimax"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Разработка: Genimax
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
