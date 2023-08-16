import { createSlice } from '@reduxjs/toolkit'

import { RootState } from './'

export type DailyReport = { id: string; memo?: string }

const initialState: { dailyReports: DailyReport[] } = { dailyReports: [] }

export const dailyReportSlice = createSlice({
  name: 'dailyReports',
  initialState,
  reducers: {
    getDailyReports: (state, { payload }: { payload: DailyReport[] }) => {
      state.dailyReports = payload
    },
  },
})

export const selectDailyReports = (state: RootState): DailyReport[] => {
  const dailyReports = state.dailyReports.dailyReports
  return dailyReports ? dailyReports : []
}

export const { getDailyReports } = dailyReportSlice.actions
