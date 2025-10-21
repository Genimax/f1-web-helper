"use client";

import { useState, useEffect } from "react";
import { useNextRace } from "@/shared/lib/f1/useF1Data";
import styles from "./CountdownTimer.module.scss";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
}

export const CountdownTimer = () => {
    const { data: nextRaceData, loading, error } = useNextRace();
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
    });
    const [blink, setBlink] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!nextRaceData?.race?.[0]?.schedule?.race?.date) return;

        const calculateTimeLeft = (): TimeLeft => {
            const raceDate = new Date(nextRaceData.race[0].schedule.race.date);
            const now = new Date();
            const difference = raceDate.getTime() - now.getTime();

            if (difference <= 0) {
                return { days: 0, hours: 0, minutes: 0 };
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (difference % (1000 * 60 * 60)) / (1000 * 60)
            );

            return { days, hours, minutes };
        };

        // Устанавливаем начальное время
        setTimeLeft(calculateTimeLeft());

        // Обновляем каждую минуту
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 60000);

        return () => clearInterval(timer);
    }, [nextRaceData]);

    // Эффект для мигания двоеточий каждую секунду
    useEffect(() => {
        const blinkTimer = setInterval(() => {
            setBlink((prev) => !prev);
        }, 1000);

        return () => clearInterval(blinkTimer);
    }, []);

    // Эффект для установки готовности таймера
    useEffect(() => {
        if (!loading && nextRaceData?.race?.[0]) {
            // Небольшая задержка для плавного появления
            const timer = setTimeout(() => {
                setIsReady(true);
            }, 100);
            return () => clearTimeout(timer);
        } else {
            setIsReady(false);
        }
    }, [loading, nextRaceData]);

    if (loading) {
        return null;
    }

    if (error || !nextRaceData?.race?.[0]) {
        return (
            <div className={styles.countdownTimer}>
                <div className={styles.error}>No upcoming race</div>
            </div>
        );
    }

    const race = nextRaceData.race[0];
    const isRaceOver =
        timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0;

    return (
        <div
            className={`${styles.countdownTimer} ${
                isReady ? styles.fadeIn : styles.hidden
            }`}
        >
            <div className={styles.nextRaceLabel}>NEXT RACE</div>

            {isRaceOver ? (
                <div className={styles.raceStatus}>
                    <span className={styles.statusText}>Race Day!</span>
                </div>
            ) : (
                <div className={styles.timer}>
                    <div className={styles.timeUnit}>
                        <span className={styles.timeValue}>
                            {timeLeft.days.toString().padStart(2, "0")}
                        </span>
                        <span className={styles.timeLabel}>Days</span>
                    </div>
                    <span
                        className={`${styles.separator} ${
                            blink ? styles.blink : ""
                        }`}
                    >
                        :
                    </span>
                    <div className={styles.timeUnit}>
                        <span className={styles.timeValue}>
                            {timeLeft.hours.toString().padStart(2, "0")}
                        </span>
                        <span className={styles.timeLabel}>Hours</span>
                    </div>
                    <span
                        className={`${styles.separator} ${
                            blink ? styles.blink : ""
                        }`}
                    >
                        :
                    </span>
                    <div className={styles.timeUnit}>
                        <span className={styles.timeValue}>
                            {timeLeft.minutes.toString().padStart(2, "0")}
                        </span>
                        <span className={styles.timeLabel}>Minutes</span>
                    </div>
                </div>
            )}
        </div>
    );
};
