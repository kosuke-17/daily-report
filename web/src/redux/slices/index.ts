import { createSlice } from '@reduxjs/toolkit'

type DailyReport = { id: string; memo?: string }

const initialState: DailyReport[] = []

export const dailyReportSlice = createSlice({
  name: 'dailyReports',
  initialState,
  reducers: {
    getDailyReports: (state, { payload }) => {
      state = payload
    },
  },
})

export const { getDailyReports } = dailyReportSlice.actions
