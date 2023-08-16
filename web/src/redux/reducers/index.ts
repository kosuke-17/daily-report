import { combineReducers } from 'redux'
import { dailyReportSlice } from '../slices/daily-reports'

export const rootReducer = combineReducers({
  dailyReports: dailyReportSlice.reducer,
})
