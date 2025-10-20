import {
    F1DriversChampionshipResponse,
    F1ApiParams,
    F1NextRaceResponse,
} from "./types/f1Api";

const BASE_URL = "https://f1api.dev/api";

class F1ApiService {
    private baseUrl: string;

    constructor(baseUrl: string = BASE_URL) {
        this.baseUrl = baseUrl;
    }

    private async fetchData<T>(
        endpoint: string,
        params?: Record<string, any>
    ): Promise<T> {
        const url = new URL(`${this.baseUrl}${endpoint}`);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, value.toString());
                }
            });
        }

        const response = await fetch(url.toString(), {
            headers: {
                Accept: "application/json",
                "User-Agent": "F1-Web-Helper/1.0",
            },
            // Кэшируем запросы на 5 минут для fallback
            next: { revalidate: 300 },
        });

        if (!response.ok) {
            throw new Error(
                `F1 API Error: ${response.status} ${response.statusText}`
            );
        }

        return response.json();
    }

    /**
     * Получает позиции пилотов в чемпионате текущего года
     */
    async getCurrentDriversChampionship(
        params?: F1ApiParams
    ): Promise<F1DriversChampionshipResponse> {
        return this.fetchData<F1DriversChampionshipResponse>(
            "/current/drivers-championship",
            params
        );
    }

    /**
     * Получает позиции команд в чемпионате текущего года
     */
    async getCurrentConstructorsChampionship(
        params?: F1ApiParams
    ): Promise<any> {
        return this.fetchData("/current/constructors-championship", params);
    }

    /**
     * Получает расписание гонок текущего года
     */
    async getCurrentSchedule(params?: F1ApiParams): Promise<any> {
        return this.fetchData("/current/schedule", params);
    }

    /**
     * Получает информацию о пилотах
     */
    async getDrivers(params?: F1ApiParams): Promise<any> {
        return this.fetchData("/drivers", params);
    }

    /**
     * Получает информацию о командах
     */
    async getTeams(params?: F1ApiParams): Promise<any> {
        return this.fetchData("/teams", params);
    }

    /**
     * Получает информацию о следующем уикенде
     */
    async getNextRace(): Promise<F1NextRaceResponse> {
        return this.fetchData<F1NextRaceResponse>("/current/next");
    }
}

// Экспортируем singleton instance
export const f1ApiService = new F1ApiService();
export default f1ApiService;
