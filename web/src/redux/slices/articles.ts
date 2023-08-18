import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '.'

export type Article = {
  id: number
  userId: number
  title: string
  body: string
}

const initialState: { articles: Article[] } = { articles: [] }

export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    getArticles: (state, { payload }: { payload: Article[] }) => {
      state.articles = payload
    },
  },
})

export const selectArticles = (state: RootState) => {
  const articles = state.articles.articles
  return articles
}

export const { getArticles } = articleSlice.actions
