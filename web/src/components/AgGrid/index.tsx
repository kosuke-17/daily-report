import { AgGridReact } from 'ag-grid-react'
import { useDispatch, useSelector } from 'react-redux'
import { getDailyReports } from '../../redux/sagas/daily-report'
import {
  DailyReport,
  selectDailyReports,
} from '../../redux/slices/daily-reports'
import { ColDef } from 'ag-grid-community'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const AgGrid = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dailyReports = useSelector(selectDailyReports)

  useEffect(() => {
    dispatch(getDailyReports())
  }, [dispatch])

  const columnDefs: ColDef<DailyReport>[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'memo', headerName: '日記メモ' },
  ]

  if (!dailyReports.length) return null

  return (
    <Box>
      <h2>Ag-Gridのコンポーネント</h2>
      <Box
        className='ag-theme-alpine'
        sx={{ height: 400 }}
        style={{ height: 400, width: 400 }}
      >
        <AgGridReact rowData={dailyReports} columnDefs={columnDefs} />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Button
          variant='contained'
          onClick={() => {
            navigate('/placeholder')
          }}
          sx={{}}
        >
          JSONplaceholderに移動
        </Button>
      </Box>
    </Box>
  )
}

export default AgGrid
