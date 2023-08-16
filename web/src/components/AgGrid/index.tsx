import { AgGridReact } from 'ag-grid-react'
import { useDispatch, useSelector } from 'react-redux'
import { getDailyReports } from '../../redux/sagas/daily-report'
import {
  DailyReport,
  selectDailyReports,
} from '../../redux/slices/daily-reports'
import { ColDef } from 'ag-grid-community'
import { useEffect } from 'react'

const AgGrid = () => {
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
    <div className='ag-theme-alpine' style={{ height: 400, width: 400 }}>
      <AgGridReact rowData={dailyReports} columnDefs={columnDefs} />
    </div>
  )
}

export default AgGrid
