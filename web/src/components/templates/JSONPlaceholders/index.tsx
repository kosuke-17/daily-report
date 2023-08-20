import { useEffect } from 'react'
import Button from '../../atoms/Button'
import { ColDef, ICellRendererParams } from 'ag-grid-community'
import { Link, useNavigate } from 'react-router-dom'
import AgGrid from '../../organisms/AgGrid'
import { useDispatch, useSelector } from 'react-redux'
import { getArticles } from '../../../redux/sagas/articles'
import { selectArticles } from '../../../redux/slices/articles'
import Box from '@mui/material/Box'

type JSONPlaceholderType = {
  userId: number
  id: number
  title: string
  body: string
}

const JSONPlaceholders = () => {
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
    {
      field: 'title',
      headerName: 'タイトル',
      cellRenderer: (params: ICellRendererParams) => {
        console.log({ params })

        return (
          <Link to={`/placeholders/${params.data.id}`}>{params.value}</Link>
        )
      },
    },
    { field: 'body', headerName: '文章' },
  ]

  if (!articles) return null

  return (
    <>
      <h2>JSONPlaceholders</h2>
      <AgGrid
        agGridReactProps={{
          columnDefs,
          rowData: articles,
        }}
      />
      <Box sx={{ mt: 1 }}>
        <Button text='Ag-Gridに移動' onClick={moveToDailyReport} />
      </Box>
    </>
  )
}

export default JSONPlaceholders
