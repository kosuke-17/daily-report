type RootState = {
  // saved obj
  // ここがないとstateを入れておく箱が作れない
  dailyReports: {
    // exist data
    dailyReports: { id: string; memo?: string }[]
  }
}

export { RootState }
