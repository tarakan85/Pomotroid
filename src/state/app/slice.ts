import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MINUTE } from "@constants"

import { createStagesPattern } from "./utils"

export type stagesType = "work" | "sbreak" | "lbreak"

export interface IApp {
    remainingTime: number
    paused: boolean
    stagesPattern: stagesType[]
    currentStageIndex: number
    durations: IDurations
}

export interface IDurations {
    work: number
    sbreak: number
    lbreak: number
}

const initialState: IApp = {
    remainingTime: 0.1 * MINUTE,
    paused: true,
    stagesPattern: createStagesPattern(4),
    currentStageIndex: 0,
    durations: {
        work: 0.1 * MINUTE,
        sbreak: 0.1 * MINUTE,
        lbreak: 0.1 * MINUTE,
    },
}

const issuesDisplaySlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        startCountdown(state, action: PayloadAction<number>) {
            state.remainingTime = action.payload
            state.paused = false
        },
        pauseCountdown(state) {
            state.paused = true
        },
        updateCountdown(state, action: PayloadAction<number>) {
            state.remainingTime = action.payload
        },
        nextStage(state) {
            state.currentStageIndex++
            if (state.currentStageIndex === state.stagesPattern.length) {
                state.currentStageIndex = 0
            }
        },
    },
})

export const {
    startCountdown,
    pauseCountdown,
    updateCountdown,
    nextStage,
} = issuesDisplaySlice.actions

export const { reducer: appReducer } = issuesDisplaySlice