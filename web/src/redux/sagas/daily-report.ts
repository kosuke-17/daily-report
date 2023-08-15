import { put, call, takeLatest, StrictEffect } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { getDailyReports as getDailyReportsSlice } from '../slices/'

const GET_DAILY_REPORT = 'GET_DAILY_REPORT'

function applyAxios(): Promise<AxiosResponse<{ data: any }>> {
  const url = 'http://localhost:8000/daily-reports'
  return axios.get(url)
}

function* callApi(): Generator<StrictEffect, any, { data: any }> {
  try {
    const res = yield call(applyAxios)
    console.log({ res })
    yield put(getDailyReportsSlice(res))
  } catch (e) {
    console.log(e)
  }
}

export const getDailyReports = () => ({ type: GET_DAILY_REPORT })

export function* dailyReportSaga() {
  yield takeLatest(GET_DAILY_REPORT, callApi)
}
