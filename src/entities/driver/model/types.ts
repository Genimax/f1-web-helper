export interface Driver {
    id: string;
    position: number;
    name: string;
    team: string;
    points: number;
    wins: number;
    podiums: number;
    flag: string;
    nationality: string;
    dateOfBirth: string;
    number: number;
}

export interface DriverStandings {
    drivers: Driver[];
    season: number;
    lastUpdated: string;
}
