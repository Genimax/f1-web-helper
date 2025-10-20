// Типы данных на основе F1 API документации
export interface F1Driver {
    name: string;
    surname: string;
    nationality: string;
    birthday: string;
    number: number;
    shortName: string;
    url: string;
}

export interface F1Team {
    teamId: string;
    teamName: string;
    country: string;
    firstAppareance: number;
    constructorsChampionships: number | null;
    driversChampionships: number | null;
    url: string;
}

export interface F1DriverChampionshipEntry {
    classificationId: number;
    driverId: string;
    teamId: string;
    points: number;
    position: number | null;
    wins: number;
    driver: F1Driver;
    team: F1Team;
}

export interface F1DriversChampionshipResponse {
    api: string;
    url: string;
    limit: number;
    total: number;
    season: number;
    championshipId: string;
    drivers_championship: F1DriverChampionshipEntry[];
}

// Новые типы для конструкторов
export interface F1ConstructorChampionshipEntry {
    classificationId: number;
    teamId: string;
    points: number;
    position: number;
    wins: number;
    team: F1Team;
}

export interface F1ConstructorsChampionshipResponse {
    api: string;
    url: string;
    limit: number;
    offset: number;
    total: number;
    season: number;
    championshipId: string;
    constructors_championship: F1ConstructorChampionshipEntry[];
}

export interface F1ApiParams {
    limit?: number;
    offset?: number;
}
