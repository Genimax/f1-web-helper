export interface Team {
    id: string;
    position: number;
    name: string;
    points: number;
    wins: number;
    podiums: number;
    color: string;
    country: string;
    founded: number;
    drivers: string[];
}

export interface TeamStandings {
    teams: Team[];
    season: number;
    lastUpdated: string;
}
