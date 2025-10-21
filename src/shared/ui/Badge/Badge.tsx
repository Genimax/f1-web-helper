import styles from "./Badge.module.scss";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "top" | "accent" | "gold" | "silver" | "bronze";
    size?: "small" | "medium";
    className?: string;
}

export const Badge = ({
    children,
    variant = "default",
    size = "medium",
    className = "",
}: BadgeProps) => {
    const badgeClasses = [
        styles.badge,
        styles[variant],
        styles[size],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const containerClasses = [styles.badgeContainer, styles[variant]]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={containerClasses}>
            <span className={badgeClasses}>{children}</span>
        </div>
    );
};
