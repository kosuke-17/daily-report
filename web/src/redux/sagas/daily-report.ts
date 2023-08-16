import { put, call, takeLatest, StrictEffect } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import {
  DailyReport,
  getDailyReports as getDailyReportsSlice,
} from '../slices/daily-reports'

const GET_DAILY_REPORT = 'GET_DAILY_REPORT'

function applyAxios(): Promise<AxiosResponse<{ data: DailyReport[] }>> {
  const url = 'http://localhost:8000/daily-reports'
  return axios.get(url)
}

function* callApi(): Generator<StrictEffect, any, { data: DailyReport[] }> {
  try {
    const res = yield call(applyAxios)
    yield put(getDailyReportsSlice(res.data))
  } catch (e) {
    console.log(e)
  }
}

export const getDailyReports = () => ({ type: GET_DAILY_REPORT })

export function* dailyReportSaga() {
  yield takeLatest(GET_DAILY_REPORT, callApi)
}
