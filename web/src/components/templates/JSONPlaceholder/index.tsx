import { useEffect } from 'react'
import Button from '../../atoms/Button'
import { ColDef } from 'ag-grid-community'
import { useNavigate } from 'react-router-dom'
import AgGrid from '../../organisms/AgGrid'
import Stack from '@mui/material/Stack'
import { useDispatch, useSelector } from 'react-redux'
import { getArticles } from '../../../redux/sagas/articles'
import { selectArticles } from '../../../redux/slices/articles'

type JSONPlaceholderType = {
  userId: number
  id: number
  title: string
  body: string
}

const JSONPlaceholder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const articles = useSelector(selectArticles)

  useEffect(() => {
    dispatch(getArticles())
  }, [dispatch])

  const moveToDailyReport = () => {
    navigate('/')
  }

  const columnDefs: ColDef<JSONPlaceholderType>[] = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'userId', headerName: 'ユーザーID', width: 120 },
    { field: 'title', headerName: 'タイトル' },
    { field: 'body', headerName: '文章' },
  ]

  return (
    <>
      <h2>JSONPlaceholder</h2>
      <Stack spacing={1}>
        <AgGrid
          agGridReactProps={{
            columnDefs,
            rowData: articles,
          }}
        />
        <Button text='Ag-Gridに移動' onClick={moveToDailyReport} />
      </Stack>
    </>
  )
}

export default JSONPlaceholder
