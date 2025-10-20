import styles from "./Footer.module.scss";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <div className={styles.footerInfo}>
                        <p>
                            Data provided by{" "}
                            <a
                                href="https://f1api.dev/api"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                F1 API
                            </a>
                        </p>
                        <p>© 2024 F1 Web Helper. All rights reserved.</p>
                    </div>
                    <div className={styles.footerLinks}>
                        <a
                            href="https://www.formula1.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Formula 1 Official
                        </a>
                        <a
                            href="https://f1api.dev/api"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            F1 API Documentation
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
