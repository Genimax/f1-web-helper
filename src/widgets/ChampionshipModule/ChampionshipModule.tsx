"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/shared/lib/store/hooks";
import { DriverStandingsTable } from "@/features/driver-standings/ui/DriverStandingsTable";
import { TeamStandingsTable } from "@/features/team-standings/ui/TeamStandingsTable";
import styles from "./ChampionshipModule.module.scss";

type TabType = "drivers" | "teams" | "schedule" | "calculator";

export const ChampionshipModule = () => {
    const [activeTab, setActiveTab] = useState<TabType>("drivers");

    // Получаем сезон из Redux store
    const { driversChampionship, constructorsChampionship } = useAppSelector(
        (state) => state.f1
    );

    // Определяем текущий сезон (приоритет у drivers, если нет - у constructors)
    const currentSeason =
        driversChampionship.season ||
        constructorsChampionship.season ||
        new Date().getFullYear();

    const tabs = [
        { id: "drivers" as const, label: "Drivers", icon: "🏆" },
        { id: "teams" as const, label: "Teams", icon: "🏁" },
        { id: "schedule" as const, label: "Schedule", icon: "📅" },
        { id: "calculator" as const, label: "Calculator", icon: "🧮" },
    ];

    // Анимации для переключения вкладок
    const tabVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
        }),
    };

    const tabTransition = {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
    } as const;

    const handleTabChange = (newTab: TabType) => {
        setActiveTab(newTab);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "drivers":
                return <DriverStandingsTable />;
            case "teams":
                return <TeamStandingsTable />;
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
                    <h2>{currentSeason} Championship</h2>
                    <p>Current standings and statistics</p>
                </div>

                <div className={styles.tabs}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`${styles.tab} ${
                                activeTab === tab.id ? styles.tabActive : ""
                            }`}
                            onClick={() => handleTabChange(tab.id)}
                        >
                            <span className={styles.tabIcon}>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.contentContainer}>
                <AnimatePresence mode="popLayout" custom={1}>
                    <motion.div
                        key={activeTab}
                        custom={1}
                        variants={tabVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={tabTransition}
                        className={styles.animatedContent}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
