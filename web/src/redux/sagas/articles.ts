import { put, call, takeLatest, StrictEffect } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'

import { Article, getArticles as getArticlesSlice } from '../slices/articles'

const GET_ARTICLE = 'GET_ARTICLE'

function applyAxios(): Promise<AxiosResponse<{ data: Article[] }>> {
  const url = 'https://jsonplaceholder.typicode.com/posts'
  return axios.get(url)
}

function* callApi(): Generator<StrictEffect, any, { data: Article[] }> {
  try {
    const res = yield call(applyAxios)
    yield put(getArticlesSlice(res.data))
  } catch (e) {
    console.log(e)
  }
}

export const getArticles = () => ({ type: GET_ARTICLE })

export function* articleSaga() {
  yield takeLatest(GET_ARTICLE, callApi)
}
