import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from '../../atoms/Button'
import { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'

type JSONPlaceholderType = {
  userId: number
  id: number
  title: string
  body: string
}

const JSONPlaceholder = () => {
  const [posts, setPosts] = useState<JSONPlaceholderType[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(res.data)
    }
    getPosts()
  }, [])

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
      <Box className='ag-theme-alpine' sx={{ height: 600, width: 600 }}>
        <AgGridReact rowData={posts} columnDefs={columnDefs} />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Button text='Ag-Gridに移動' onClick={moveToDailyReport} />
      </Box>
    </>
  )
}

export default JSONPlaceholder
