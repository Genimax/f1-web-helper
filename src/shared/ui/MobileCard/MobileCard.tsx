import { ReactNode } from "react";
import styles from "./MobileCard.module.scss";

interface MobileCardProps {
    children: ReactNode;
    className?: string;
}

export const MobileCard = ({ children, className = "" }: MobileCardProps) => {
    const cardClasses = [styles.mobileCard, className]
        .filter(Boolean)
        .join(" ");

    return <div className={cardClasses}>{children}</div>;
};
