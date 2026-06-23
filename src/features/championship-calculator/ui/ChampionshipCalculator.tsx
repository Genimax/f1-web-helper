"use client";

import { useMemo, useState } from "react";
import { Badge, TableSkeleton } from "@/shared/ui";
import type {
    F1DriverChampionshipEntry,
    F1Race,
} from "@/shared/api/types/f1Api";
import { useF1Data } from "@/shared/lib/f1/useF1Data";
import { useSchedule } from "@/shared/lib/f1/useSchedule";
import { getRaceStatus } from "@/shared/lib/utils/scheduleUtils";
import { getPositionVariant } from "@/shared/lib";
import styles from "./ChampionshipCalculator.module.scss";

const RACE_WIN_POINTS = 25;
const SPRINT_WIN_POINTS = 8;

interface RacePlan {
    race: F1Race;
    maxPoints: number;
    requiredNow: number;
    paceTarget: number;
    hasSprint: boolean;
}

interface RivalConstraint {
    driver: F1DriverChampionshipEntry;
    allowedPoints: number;
    pointsToMiss: number;
    averageAllowed: number;
    canStillBeat: boolean;
}

interface NextRaceRivalScenario {
    driver: F1DriverChampionshipEntry;
    maxAllowed: number;
    label: string;
}

const getDriverName = (entry: F1DriverChampionshipEntry) =>
    `${entry.driver.name} ${entry.driver.surname}`;

const hasSprint = (race: F1Race) => Boolean(race.schedule.sprintRace.date);

const getRaceMaxPoints = (race: F1Race) =>
    RACE_WIN_POINTS + (hasSprint(race) ? SPRINT_WIN_POINTS : 0);

const getRemainingRaces = (races: F1Race[]) =>
    races
        .filter((race) => {
            const status = getRaceStatus(race);
            return status === "upcoming" || status === "ongoing" || status === "tbd";
        })
        .sort((a, b) => a.round - b.round);

const clampPoints = (value: number, max: number) =>
    Math.max(0, Math.min(value, max));

const buildRacePlan = (remainingRaces: F1Race[], targetPoints: number) => {
    let remainingTarget = Math.max(0, targetPoints);

    return remainingRaces.map((race, index) => {
        const futureMaxPoints = remainingRaces
            .slice(index + 1)
            .reduce((sum, futureRace) => sum + getRaceMaxPoints(futureRace), 0);
        const maxPoints = getRaceMaxPoints(race);
        const requiredNow = clampPoints(
            remainingTarget - futureMaxPoints,
            maxPoints
        );
        const racesLeft = remainingRaces.length - index;
        const paceTarget = clampPoints(
            Math.ceil(remainingTarget / racesLeft),
            maxPoints
        );

        remainingTarget = Math.max(0, remainingTarget - requiredNow);

        return {
            race,
            maxPoints,
            requiredNow,
            paceTarget,
            hasSprint: hasSprint(race),
        };
    });
};

export const ChampionshipCalculator = () => {
    const { driversChampionship } = useF1Data();
    const { schedule } = useSchedule();
    const [selectedDriverId, setSelectedDriverId] = useState<string>("");

    const standings = driversChampionship.data || [];
    const selectedDriver =
        standings.find((driver) => driver.driverId === selectedDriverId) ||
        standings[0] ||
        null;

    const remainingRaces = useMemo(
        () => getRemainingRaces(schedule.data || []),
        [schedule.data]
    );

    const totalRemainingPoints = useMemo(
        () =>
            remainingRaces.reduce(
                (sum, race) => sum + getRaceMaxPoints(race),
                0
            ),
        [remainingRaces]
    );

    const calculation = useMemo(() => {
        if (!selectedDriver) return null;

        const rivals = standings.filter(
            (driver) => driver.driverId !== selectedDriver.driverId
        );
        const selectedMaxFinal =
            selectedDriver.points + totalRemainingPoints;
        const strongestRivalMaxFinal = rivals.reduce(
            (max, rival) => Math.max(max, rival.points + totalRemainingPoints),
            0
        );
        const pointsToGuarantee = Math.max(
            0,
            strongestRivalMaxFinal - selectedDriver.points + 1
        );
        const canGuarantee = pointsToGuarantee <= totalRemainingPoints;
        const targetPoints = canGuarantee
            ? pointsToGuarantee
            : totalRemainingPoints;
        const projectedFinal = selectedDriver.points + targetPoints;
        const rivalsConstraints: RivalConstraint[] = rivals
            .map((rival) => {
                const allowedPoints = Math.max(
                    0,
                    projectedFinal - rival.points - 1
                );
                const cappedAllowedPoints = Math.min(
                    allowedPoints,
                    totalRemainingPoints
                );

                return {
                    driver: rival,
                    allowedPoints: cappedAllowedPoints,
                    pointsToMiss: Math.max(
                        0,
                        totalRemainingPoints - cappedAllowedPoints
                    ),
                    averageAllowed:
                        remainingRaces.length > 0
                            ? cappedAllowedPoints / remainingRaces.length
                            : 0,
                    canStillBeat:
                        rival.points + totalRemainingPoints >= projectedFinal,
                };
            })
            .filter((rival) => rival.canStillBeat || rival.pointsToMiss > 0)
            .sort((a, b) => b.pointsToMiss - a.pointsToMiss);
        const racePlan = buildRacePlan(remainingRaces, targetPoints);
        const nextRacePlan = racePlan[0] || null;
        const nextRaceRivals: NextRaceRivalScenario[] = nextRacePlan
            ? rivalsConstraints.map((constraint) => {
                  const maxAllowed = Math.min(
                      nextRacePlan.maxPoints,
                      constraint.allowedPoints
                  );

                  return {
                      driver: constraint.driver,
                      maxAllowed,
                      label: maxAllowed === 0 ? "DNF/DNS" : `Max ${maxAllowed}`,
                  };
              })
            : [];

        return {
            canGuarantee,
            pointsToGuarantee,
            targetPoints,
            projectedFinal,
            selectedMaxFinal,
            racePlan,
            nextRacePlan,
            nextRaceRivals,
            rivalsConstraints,
        };
    }, [remainingRaces, selectedDriver, standings, totalRemainingPoints]);

    const isLoading = driversChampionship.loading || schedule.loading;
    const error = driversChampionship.error || schedule.error;

    if (isLoading) {
        return (
            <div className={styles.calculatorSection}>
                <div className={styles.tableHeader}>
                    <h3>Championship Calculator</h3>
                    <div className={styles.tableMeta}>Loading API data...</div>
                </div>
                <TableSkeleton rows={6} columns={4} />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.calculatorSection}>
                <div className={styles.error}>
                    <p>Error loading calculator data: {error}</p>
                </div>
            </div>
        );
    }

    if (!selectedDriver || standings.length === 0) {
        return (
            <div className={styles.calculatorSection}>
                <div className={styles.noData}>
                    <p>No driver standings data available.</p>
                </div>
            </div>
        );
    }

    if (remainingRaces.length === 0) {
        return (
            <div className={styles.calculatorSection}>
                <div className={styles.tableHeader}>
                    <h3>Championship Calculator</h3>
                    <div className={styles.tableMeta}>
                        {driversChampionship.season} Season
                    </div>
                </div>
                <div className={styles.noData}>
                    <p>No remaining races found in the API schedule.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.calculatorSection}>
            <div className={styles.tableHeader}>
                <div>
                    <h3>Championship Calculator</h3>
                    <div className={styles.tableMeta}>
                        <span>{driversChampionship.season} Season</span>
                        <span className={styles.divider}>/</span>
                        <span>{remainingRaces.length} races left</span>
                        <span className={styles.divider}>/</span>
                        <span>{totalRemainingPoints} points available</span>
                    </div>
                </div>

                <label className={styles.driverPicker}>
                    <span>Driver</span>
                    <select
                        value={selectedDriver.driverId}
                        onChange={(event) =>
                            setSelectedDriverId(event.target.value)
                        }
                    >
                        {standings.map((driver) => (
                            <option key={driver.driverId} value={driver.driverId}>
                                {getDriverName(driver)} - {driver.points} pts
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {calculation && (
                <>
                    <div className={styles.summaryGrid}>
                        <div className={styles.summaryCard}>
                            <span className={styles.summaryLabel}>Current</span>
                            <strong>{selectedDriver.points}</strong>
                            <span className={styles.summaryDetail}>
                                points, P{selectedDriver.position || "-"}
                            </span>
                        </div>

                        <div className={styles.summaryCard}>
                            <span className={styles.summaryLabel}>
                                Needed Target
                            </span>
                            <strong>{calculation.targetPoints}</strong>
                            <span className={styles.summaryDetail}>
                                {calculation.canGuarantee
                                    ? "to guarantee the title"
                                    : "maximum possible from here"}
                            </span>
                        </div>

                        <div className={styles.summaryCard}>
                            <span className={styles.summaryLabel}>
                                Projected Finish
                            </span>
                            <strong>{calculation.projectedFinal}</strong>
                            <span className={styles.summaryDetail}>
                                if this scenario happens
                            </span>
                        </div>

                        <div
                            className={`${styles.summaryCard} ${
                                calculation.canGuarantee
                                    ? styles.successCard
                                    : styles.warningCard
                            }`}
                        >
                            <span className={styles.summaryLabel}>Status</span>
                            <strong>
                                {calculation.canGuarantee
                                    ? "In control"
                                    : "Needs help"}
                            </strong>
                            <span className={styles.summaryDetail}>
                                {calculation.canGuarantee
                                    ? `${calculation.pointsToGuarantee} points beats any rival maximum`
                                    : "at least one rival must stay below their remaining maximum"}
                            </span>
                        </div>
                    </div>

                    {calculation.nextRacePlan && (
                        <section className={styles.nextRaceScenario}>
                            <div className={styles.nextRaceHeader}>
                                <div>
                                    <span className={styles.summaryLabel}>
                                        Next race scenario
                                    </span>
                                    <h4>
                                        {calculation.nextRacePlan.race.raceName ||
                                            `${calculation.nextRacePlan.race.circuit.circuitName} Grand Prix`}
                                    </h4>
                                    <p>
                                        What needs to happen immediately for this
                                        championship path to stay alive.
                                    </p>
                                </div>

                                <div className={styles.selectedNextTarget}>
                                    <span>{getDriverName(selectedDriver)}</span>
                                    <strong>
                                        {calculation.nextRacePlan.requiredNow}
                                    </strong>
                                    <span>
                                        needed from{" "}
                                        {calculation.nextRacePlan.maxPoints}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.nextRaceRivals}>
                                {calculation.nextRaceRivals.length > 0 ? (
                                    calculation.nextRaceRivals.map((rival) => (
                                        <div
                                            key={rival.driver.driverId}
                                            className={`${styles.nextRaceRival} ${
                                                rival.maxAllowed === 0
                                                    ? styles.dnfScenario
                                                    : ""
                                            }`}
                                        >
                                            <div className={styles.rivalInfo}>
                                                <Badge
                                                    variant={getPositionVariant(
                                                        rival.driver.position
                                                    )}
                                                >
                                                    {rival.driver.position ||
                                                        "-"}
                                                </Badge>
                                                <div>
                                                    <div
                                                        className={
                                                            styles.rivalName
                                                        }
                                                    >
                                                        {getDriverName(
                                                            rival.driver
                                                        )}
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.raceMeta
                                                        }
                                                    >
                                                        {rival.driver.points}{" "}
                                                        current points
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.nextRaceCap}>
                                                <span>Next race cap</span>
                                                <strong>{rival.label}</strong>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.noData}>
                                        <p>
                                            No rival restriction is needed in the
                                            next race.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    <div className={styles.analysisGrid}>
                        <section className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h4>Race-by-race target</h4>
                                <p>
                                    Required now assumes maximum points in all
                                    later races. Pace target spreads the
                                    selected scenario across the remaining
                                    calendar.
                                </p>
                            </div>

                            <div className={styles.raceList}>
                                {calculation.racePlan.map((plan: RacePlan) => (
                                    <div
                                        key={plan.race.raceId}
                                        className={styles.raceItem}
                                    >
                                        <div className={styles.raceInfo}>
                                            <Badge variant="default">
                                                {plan.race.round}
                                            </Badge>
                                            <div>
                                                <div className={styles.raceName}>
                                                    {plan.race.raceName ||
                                                        `${plan.race.circuit.circuitName} Grand Prix`}
                                                </div>
                                                <div className={styles.raceMeta}>
                                                    {plan.race.circuit.country}
                                                    {plan.hasSprint
                                                        ? " / sprint weekend"
                                                        : ""}
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.targetStats}>
                                            <div>
                                                <span>Required now</span>
                                                <strong>
                                                    {plan.requiredNow}
                                                </strong>
                                            </div>
                                            <div>
                                                <span>Pace target</span>
                                                <strong>
                                                    {plan.paceTarget}
                                                </strong>
                                            </div>
                                            <div>
                                                <span>Max</span>
                                                <strong>{plan.maxPoints}</strong>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h4>Rival limits</h4>
                                <p>
                                    This shows each live rival's future scoring
                                    cap before they overtake the selected driver
                                    in the scenario above.
                                </p>
                            </div>

                            <div className={styles.rivalList}>
                                {calculation.rivalsConstraints.length > 0 ? (
                                    calculation.rivalsConstraints.map(
                                        (constraint) => (
                                            <div
                                                key={constraint.driver.driverId}
                                                className={styles.rivalItem}
                                            >
                                                <div className={styles.rivalInfo}>
                                                    <Badge
                                                        variant={getPositionVariant(
                                                            constraint.driver
                                                                .position
                                                        )}
                                                    >
                                                        {constraint.driver
                                                            .position || "-"}
                                                    </Badge>
                                                    <div>
                                                        <div
                                                            className={
                                                                styles.rivalName
                                                            }
                                                        >
                                                            {getDriverName(
                                                                constraint.driver
                                                            )}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.raceMeta
                                                            }
                                                        >
                                                            {
                                                                constraint.driver
                                                                    .points
                                                            }{" "}
                                                            current points
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    className={
                                                        styles.rivalConstraint
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.rivalConstraintItem
                                                        }
                                                    >
                                                        <span>Can score up to</span>
                                                        <strong>
                                                            {
                                                                constraint.allowedPoints
                                                            }
                                                        </strong>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.rivalConstraintItem
                                                        }
                                                    >
                                                        <span>Must miss</span>
                                                        <strong>
                                                            {
                                                                constraint.pointsToMiss
                                                            }
                                                        </strong>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.rivalConstraintItem
                                                        }
                                                    >
                                                        <span>Average cap</span>
                                                        <strong>
                                                            {constraint.averageAllowed.toFixed(
                                                                1
                                                            )}
                                                        </strong>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <div className={styles.noData}>
                                        <p>
                                            No rival can catch this scenario.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    <div className={styles.note}>
                        The calculator uses current API standings and remaining
                        races from the API schedule. Race wins are modeled as 25
                        points and sprint wins as 8 points. Rival limits are
                        future scoring caps, not points removed from current
                        standings. Ties are treated as not safe, so the selected
                        driver must finish strictly ahead on points.
                    </div>
                </>
            )}
        </div>
    );
};
