export const ADD_DAILY_REPORT = 'ADD_DAILY_REPORT'
export const GET_DAILY_REPORT = 'GET_DAILY_REPORT'

/**
 * 日記一覧を取得するaction
 * @param dailyReports
 * @returns
 *
 * TODO: Type定義
 */
export const getDailyReports = (dailyReports: any) => ({
  type: GET_DAILY_REPORT,
  dailyReports,
})

export const addDailyReport = () => ({
  tupe: ADD_DAILY_REPORT,
})
