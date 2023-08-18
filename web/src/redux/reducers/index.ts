import { combineReducers } from 'redux'
import { dailyReportSlice } from '../slices/daily-reports'
import { articleSlice } from '../slices/articles'

export const rootReducer = combineReducers({
  dailyReports: dailyReportSlice.reducer,
  articles: articleSlice.reducer,
})
