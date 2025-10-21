/**
 * Утилиты для работы с типами сессий F1
 */

export type SessionType = "practice" | "qualifying" | "sprint" | "race";

export interface SessionTypeInfo {
    label: string;
    variant: "practice" | "qualifying" | "sprint" | "race";
    description: string;
    icon?: string;
}

/**
 * Получает информацию о типе сессии
 * @param type - тип сессии
 * @returns объект с информацией о сессии
 */
export const getSessionTypeInfo = (type: SessionType): SessionTypeInfo => {
    switch (type) {
        case "practice":
            return {
                label: "Practice",
                variant: "practice",
                description: "Free practice session",
                icon: "🏁",
            };
        case "qualifying":
            return {
                label: "Qualifying",
                variant: "qualifying",
                description: "Qualifying session",
                icon: "🏆",
            };
        case "sprint":
            return {
                label: "Sprint",
                variant: "sprint",
                description: "Sprint race",
                icon: "⚡",
            };
        case "race":
            return {
                label: "Race",
                variant: "race",
                description: "Main race",
                icon: "🏎️",
            };
        default:
            return {
                label: "Unknown",
                variant: "practice",
                description: "Unknown session type",
            };
    }
};

/**
 * Получает порядок сессий для отображения
 * @returns массив типов сессий в правильном порядке
 */
export const getSessionOrder = (): SessionType[] => {
    return ["practice", "qualifying", "sprint", "race"];
};

/**
 * Проверяет, является ли сессия обязательной для всех гонок
 * @param type - тип сессии
 * @returns true, если сессия обязательная
 */
export const isRequiredSession = (type: SessionType): boolean => {
    return type === "practice" || type === "qualifying" || type === "race";
};

/**
 * Проверяет, является ли сессия спринтом
 * @param type - тип сессии
 * @returns true, если сессия является спринтом
 */
export const isSprintSession = (type: SessionType): boolean => {
    return type === "sprint";
};

/**
 * Получает цвет для типа сессии
 * @param type - тип сессии
 * @returns CSS цвет для сессии
 */
export const getSessionColor = (type: SessionType): string => {
    switch (type) {
        case "practice":
            return "rgb(59, 130, 246)"; // Blue
        case "qualifying":
            return "rgb(168, 85, 247)"; // Purple
        case "sprint":
            return "rgb(245, 158, 11)"; // Orange
        case "race":
            return "rgb(34, 197, 94)"; // Green
        default:
            return "rgb(107, 114, 128)"; // Gray
    }
};
