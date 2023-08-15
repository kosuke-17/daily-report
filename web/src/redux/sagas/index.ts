import { all } from 'redux-saga/effects'
import { dailyReportSaga } from './daily-report'

export default function* rootSaga() {
  yield all([dailyReportSaga()])
}
