import { useDispatch, useSelector } from 'react-redux'
import { getDailyReports } from '../../../redux/sagas/daily-report'
import {
  DailyReport,
  selectDailyReports,
} from '../../../redux/slices/daily-reports'
import { ColDef } from 'ag-grid-community'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../atoms/Button'
import AgGrid from '../../organisms/AgGrid'
import Stack from '@mui/material/Stack'

const DailyReports = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dailyReports = useSelector(selectDailyReports)

  useEffect(() => {
    dispatch(getDailyReports())
  }, [dispatch])

  const moveToPlaceHolder = () => {
    navigate('/placeholder')
  }

  const columnDefs: ColDef<DailyReport>[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'memo', headerName: '日記メモ' },
  ]

  if (!dailyReports.length) return null

  return (
    <>
      <h2>Ag-Gridのコンポーネント</h2>
      <Stack spacing={1}>
        <AgGrid
          agGridReactProps={{
            columnDefs,
            rowData: dailyReports,
          }}
        />
        <Button text='JSONplaceholderに移動' onClick={moveToPlaceHolder} />
      </Stack>
    </>
  )
}

export default DailyReports
