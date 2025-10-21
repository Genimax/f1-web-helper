import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    F1DriverChampionshipEntry,
    F1DriversChampionshipResponse,
    F1ConstructorChampionshipEntry,
    F1ConstructorsChampionshipResponse,
    F1CurrentScheduleResponse,
    F1Race,
} from "@/shared/api/types/f1Api";

interface F1State {
    driversChampionship: {
        data: F1DriverChampionshipEntry[] | null;
        loading: boolean;
        error: string | null;
        lastUpdated: string | null;
        season: number | null;
    };
    constructorsChampionship: {
        data: F1ConstructorChampionshipEntry[] | null;
        loading: boolean;
        error: string | null;
        lastUpdated: string | null;
        season: number | null;
    };
    schedule: {
        data: F1Race[] | null;
        loading: boolean;
        error: string | null;
        lastUpdated: string | null;
        season: number | null;
    };
}

const initialState: F1State = {
    driversChampionship: {
        data: null,
        loading: false,
        error: null,
        lastUpdated: null,
        season: null,
    },
    constructorsChampionship: {
        data: null,
        loading: false,
        error: null,
        lastUpdated: null,
        season: null,
    },
    schedule: {
        data: null,
        loading: false,
        error: null,
        lastUpdated: null,
        season: null,
    },
};

// Async thunks для получения данных
export const fetchDriversChampionship = createAsyncThunk(
    "f1/fetchDriversChampionship",
    async (params?: { limit?: number; offset?: number }) => {
        const response = await fetch(
            `/api/f1/drivers-championship?${new URLSearchParams({
                ...(params?.limit && { limit: params.limit.toString() }),
                ...(params?.offset && { offset: params.offset.toString() }),
            })}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch drivers championship");
        }

        return response.json() as Promise<F1DriversChampionshipResponse>;
    }
);

export const fetchConstructorsChampionship = createAsyncThunk(
    "f1/fetchConstructorsChampionship",
    async (params?: { limit?: number; offset?: number }) => {
        const response = await fetch(
            `/api/f1/constructors-championship?${new URLSearchParams({
                ...(params?.limit && { limit: params.limit.toString() }),
                ...(params?.offset && { offset: params.offset.toString() }),
            })}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch constructors championship");
        }

        return response.json() as Promise<F1ConstructorsChampionshipResponse>;
    }
);

export const fetchSchedule = createAsyncThunk(
    "f1/fetchSchedule",
    async (params?: { limit?: number; offset?: number }) => {
        const response = await fetch(
            `/api/f1/current?${new URLSearchParams({
                ...(params?.limit && { limit: params.limit.toString() }),
                ...(params?.offset && { offset: params.offset.toString() }),
            })}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch schedule");
        }

        return response.json() as Promise<F1CurrentScheduleResponse>;
    }
);

const f1Slice = createSlice({
    name: "f1",
    initialState,
    reducers: {
        clearError: (
            state,
            action: PayloadAction<"drivers" | "constructors" | "schedule">
        ) => {
            if (action.payload === "drivers") {
                state.driversChampionship.error = null;
            } else if (action.payload === "constructors") {
                state.constructorsChampionship.error = null;
            } else {
                state.schedule.error = null;
            }
        },
    },
    extraReducers: (builder) => {
        // Drivers Championship
        builder
            .addCase(fetchDriversChampionship.pending, (state) => {
                state.driversChampionship.loading = true;
                state.driversChampionship.error = null;
            })
            .addCase(fetchDriversChampionship.fulfilled, (state, action) => {
                state.driversChampionship.loading = false;
                state.driversChampionship.data =
                    action.payload.drivers_championship;
                state.driversChampionship.season = action.payload.season;
                state.driversChampionship.lastUpdated =
                    new Date().toISOString();
                state.driversChampionship.error = null;
            })
            .addCase(fetchDriversChampionship.rejected, (state, action) => {
                state.driversChampionship.loading = false;
                state.driversChampionship.error =
                    action.error.message ||
                    "Failed to fetch drivers championship";
            });

        // Constructors Championship
        builder
            .addCase(fetchConstructorsChampionship.pending, (state) => {
                state.constructorsChampionship.loading = true;
                state.constructorsChampionship.error = null;
            })
            .addCase(
                fetchConstructorsChampionship.fulfilled,
                (state, action) => {
                    state.constructorsChampionship.loading = false;
                    state.constructorsChampionship.data =
                        action.payload.constructors_championship;
                    state.constructorsChampionship.season =
                        action.payload.season;
                    state.constructorsChampionship.lastUpdated =
                        new Date().toISOString();
                    state.constructorsChampionship.error = null;
                }
            )
            .addCase(
                fetchConstructorsChampionship.rejected,
                (state, action) => {
                    state.constructorsChampionship.loading = false;
                    state.constructorsChampionship.error =
                        action.error.message ||
                        "Failed to fetch constructors championship";
                }
            );

        // Schedule
        builder
            .addCase(fetchSchedule.pending, (state) => {
                state.schedule.loading = true;
                state.schedule.error = null;
            })
            .addCase(fetchSchedule.fulfilled, (state, action) => {
                state.schedule.loading = false;
                state.schedule.data = action.payload.races;
                state.schedule.season = action.payload.season;
                state.schedule.lastUpdated = new Date().toISOString();
                state.schedule.error = null;
            })
            .addCase(fetchSchedule.rejected, (state, action) => {
                state.schedule.loading = false;
                state.schedule.error =
                    action.error.message || "Failed to fetch schedule";
            });
    },
});

export const { clearError } = f1Slice.actions;
export default f1Slice.reducer;
