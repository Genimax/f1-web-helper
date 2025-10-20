/**
 * Определяет вариант Badge для позиции в чемпионате
 * @param position - позиция в чемпионате
 * @returns вариант Badge для отображения
 */
export const getPositionVariant = (
    position: number | null | undefined
): "default" | "top" | "gold" | "silver" | "bronze" => {
    if (position === null || position === undefined) return "default";

    switch (position) {
        case 1:
            return "gold";
        case 2:
            return "silver";
        case 3:
            return "bronze";
        default:
            return position <= 3 ? "top" : "default";
    }
};
