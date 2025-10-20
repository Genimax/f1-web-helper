"use client";

import { useState } from "react";
import { DriverStandingsTable } from "@/features/driver-standings/ui/DriverStandingsTable";
import { TeamStandingsTable } from "@/features/team-standings/ui/TeamStandingsTable";
import { mockDrivers } from "@/entities/driver/model/mockData";
import { mockTeams } from "@/entities/team/model/mockData";
import styles from "./ChampionshipModule.module.scss";

type TabType = "drivers" | "teams" | "schedule" | "calculator";

export const ChampionshipModule = () => {
    const [activeTab, setActiveTab] = useState<TabType>("drivers");

    const tabs = [
        { id: "drivers" as const, label: "Drivers", icon: "🏆" },
        { id: "teams" as const, label: "Teams", icon: "🏁" },
        { id: "schedule" as const, label: "Schedule", icon: "📅" },
        { id: "calculator" as const, label: "Calculator", icon: "🧮" },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "drivers":
                return <DriverStandingsTable drivers={mockDrivers} />;
            case "teams":
                return <TeamStandingsTable teams={mockTeams} />;
            case "schedule":
                return (
                    <div className={styles.placeholder}>
                        <h3>Schedule Coming Soon</h3>
                        <p>
                            Race schedule and calendar will be available here.
                        </p>
                    </div>
                );
            case "calculator":
                return (
                    <div className={styles.placeholder}>
                        <h3>Championship Calculator Coming Soon</h3>
                        <p>
                            Calculate minimum points needed for championship
                            will be available here.
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.module}>
            <div className={styles.moduleHeader}>
                <div className={styles.moduleTitle}>
                    <h2>2025 Championship</h2>
                    <p>Current standings and statistics</p>
                </div>

                <div className={styles.tabs}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`${styles.tab} ${
                                activeTab === tab.id ? styles.tabActive : ""
                            }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className={styles.tabIcon}>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {renderContent()}
        </div>
    );
};
