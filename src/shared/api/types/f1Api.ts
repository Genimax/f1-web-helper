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

// Типы для следующего уикенда
export interface F1Schedule {
    race: {
        date: string;
        time: string | null;
    };
    qualy: {
        date: string;
        time: string | null;
    };
    fp1: {
        date: string;
        time: string | null;
    };
    fp2: {
        date: string;
        time: string | null;
    };
    fp3: {
        date: string;
        time: string | null;
    };
    sprintQualy: {
        date: string | null;
        time: string | null;
    };
    sprintRace: {
        date: string | null;
        time: string | null;
    };
}

export interface F1FastLap {
    fast_lap: string | null;
    fast_lap_driver_id: string | null;
    fast_lap_team_id: string | null;
}

export interface F1Circuit {
    circuitId: string;
    circuitName: string;
    country: string;
    city: string;
    circuitLength: string;
    lapRecord: string;
    firstParticipationYear: number;
    corners: number;
    fastestLapDriverId: string;
    fastestLapTeamId: string;
    fastestLapYear: number;
    url: string;
}

export interface F1Winner {
    driverId: string;
    name: string;
    surname: string;
    country: string;
    birthday: string;
    number: number | null;
    shortName: string;
    url: string;
}

export interface F1TeamWinner {
    teamId: string;
    teamName: string;
    country: string;
    firstAppearance: number;
    constructorsChampionships: number | null;
    driversChampionships: number | null;
    url: string;
}

export interface F1Race {
    raceId: string;
    championshipId: string;
    raceName: string | null;
    schedule: F1Schedule;
    laps: number | null;
    round: number;
    url: string | null;
    fast_lap: F1FastLap;
    circuit: F1Circuit;
    winner: F1Winner | null;
    teamWinner: F1TeamWinner | null;
}

export interface F1Championship {
    championshipId: string;
    championshipName: string;
    url: string;
    year: number;
}

export interface F1NextRaceResponse {
    api: string;
    url: string;
    total: number;
    season: number;
    round: number;
    championship: F1Championship;
    race: F1Race[];
}
