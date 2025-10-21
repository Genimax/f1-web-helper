/**
 * Утилиты для работы с временем и часовыми зонами
 */

/**
 * Форматирует дату и время для отображения в локальной часовой зоне пользователя
 * @param dateString - дата в формате ISO строки
 * @param timeString - время в формате HH:MM:SS или null
 * @returns объект с отдельно отформатированными датой и временем
 */
export const formatRaceDateTime = (
    dateString: string | null,
    timeString: string | null
): { date: string; time: string } => {
    if (!dateString) {
        return { date: "TBD", time: "" };
    }

    // Если есть время, объединяем дату и время
    if (timeString) {
        const fullDateTime = `${dateString}T${timeString}`;
        const date = new Date(fullDateTime);

        // Проверяем, что дата валидна
        if (isNaN(date.getTime())) {
            return { date: formatDateOnly(dateString), time: "" };
        }

        const formattedDate = date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

        const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

        return { date: formattedDate, time: formattedTime };
    }

    // Если времени нет, показываем только дату
    return { date: formatDateOnly(dateString), time: "" };
};

/**
 * Форматирует только дату
 * @param dateString - дата в формате ISO строки
 * @returns отформатированная строка даты
 */
export const formatDateOnly = (dateString: string | null): string => {
    if (!dateString) return "TBD";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return "TBD";
    }

    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

/**
 * Форматирует только время
 * @param timeString - время в формате HH:MM:SS или null
 * @returns отформатированная строка времени
 */
export const formatTimeOnly = (timeString: string | null): string => {
    if (!timeString) return "TBD";

    // Парсим время из строки HH:MM:SS
    const timeParts = timeString.split(":");
    if (timeParts.length >= 2) {
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);

        // Создаем дату с текущей датой и указанным временем
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);

        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    }

    return "TBD";
};

/**
 * Получает информацию о временной зоне пользователя
 * @returns объект с информацией о временной зоне
 */
export const getUserTimezoneInfo = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = new Date().getTimezoneOffset();
    const offsetHours = Math.abs(offset) / 60;
    const offsetSign = offset <= 0 ? "+" : "-";

    return {
        timezone,
        offset: `${offsetSign}${offsetHours.toString().padStart(2, "0")}:00`,
        offsetMinutes: offset,
    };
};

/**
 * Форматирует дату и время с указанием временной зоны
 * @param dateString - дата в формате ISO строки
 * @param timeString - время в формате HH:MM:SS или null
 * @param showTimezone - показывать ли информацию о временной зоне
 * @returns отформатированная строка даты и времени
 */
export const formatRaceDateTimeWithTimezone = (
    dateString: string | null,
    timeString: string | null,
    showTimezone: boolean = false
): string => {
    const formatted = formatRaceDateTime(dateString, timeString);

    if (showTimezone && formatted.date !== "TBD") {
        const timezoneInfo = getUserTimezoneInfo();
        const timePart = formatted.time ? ` ${formatted.time}` : "";
        return `${formatted.date}${timePart} (${timezoneInfo.timezone})`;
    }

    const timePart = formatted.time ? ` ${formatted.time}` : "";
    return `${formatted.date}${timePart}`;
};

/**
 * Проверяет, является ли дата/время в будущем
 * @param dateString - дата в формате ISO строки
 * @param timeString - время в формате HH:MM:SS или null
 * @returns true, если дата/время в будущем
 */
export const isFutureDateTime = (
    dateString: string | null,
    timeString: string | null
): boolean => {
    if (!dateString) return false;

    const fullDateTime = timeString
        ? `${dateString}T${timeString}`
        : dateString;
    const date = new Date(fullDateTime);

    if (isNaN(date.getTime())) return false;

    return date > new Date();
};

/**
 * Получает относительное время (например, "через 2 дня")
 * @param dateString - дата в формате ISO строки
 * @param timeString - время в формате HH:MM:SS или null
 * @returns строка с относительным временем
 */
export const getRelativeTime = (
    dateString: string | null,
    timeString: string | null
): string => {
    if (!dateString) return "";

    const fullDateTime = timeString
        ? `${dateString}T${timeString}`
        : dateString;
    const date = new Date(fullDateTime);

    if (isNaN(date.getTime())) return "";

    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        const pastDays = Math.abs(diffDays);
        if (pastDays === 1) return "вчера";
        if (pastDays < 7) return `${pastDays} дней назад`;
        return "давно";
    } else if (diffDays === 0) {
        return "сегодня";
    } else if (diffDays === 1) {
        return "завтра";
    } else if (diffDays < 7) {
        return `через ${diffDays} дня`;
    } else if (diffDays < 30) {
        const weeks = Math.ceil(diffDays / 7);
        return `через ${weeks} недель`;
    } else {
        const months = Math.ceil(diffDays / 30);
        return `через ${months} месяцев`;
    }
};
