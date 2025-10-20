import { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "small" | "medium" | "large";
    children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "primary",
            size = "medium",
            className = "",
            children,
            ...props
        },
        ref
    ) => {
        const buttonClasses = [
            styles.button,
            styles[variant],
            styles[size],
            className,
        ]
            .filter(Boolean)
            .join(" ");

        return (
            <button ref={ref} className={buttonClasses} {...props}>
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
