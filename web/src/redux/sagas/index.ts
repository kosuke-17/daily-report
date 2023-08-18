import { all } from 'redux-saga/effects'
import { dailyReportSaga } from './daily-report'
import { articleSaga } from './articles'

export default function* rootSaga() {
  yield all([dailyReportSaga(), articleSaga()])
}
