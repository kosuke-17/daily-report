import { combineReducers } from 'redux'
import { dailyReportSlice } from '../slices'

export const rootReducer = combineReducers({
  dailyReports: dailyReportSlice.reducer,
})
