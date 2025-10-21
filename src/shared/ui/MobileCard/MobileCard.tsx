import { ReactNode } from "react";
import styles from "./MobileCard.module.scss";

interface MobileCardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export const MobileCard = ({
    children,
    className = "",
    onClick,
}: MobileCardProps) => {
    const cardClasses = [styles.mobileCard, className]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            className={cardClasses}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={(e) => {
                if (onClick && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            {children}
        </div>
    );
};
