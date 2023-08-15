import { Button } from '@mui/material'
import { AgGridReact } from 'ag-grid-react'
import { useDispatch, useSelector } from 'react-redux'
import { getDailyReports } from '../../redux/sagas/daily-report'
// import { getDailyReports } from '../../redux/slices'

const AgGrid = () => {
  const dispatch = useDispatch()
  const getDaily = () => {
    dispatch(getDailyReports())
  }
  const dailyReports = useSelector((state: any) => state)
  console.log({ ここはどうかな: dailyReports })

  return (
    <div className='ag-theme-alpine' style={{ height: 400, width: 400 }}>
      <Button variant='contained' onClick={getDaily}>
        取得
      </Button>
      <AgGridReact
        rowData={[
          { id: 'aaa', memo: 'メモ1' },
          { id: 'bbb', memo: 'メモ2' },
          { id: 'ccc', memo: 'メモ3' },
        ]}
        columnDefs={[{ field: 'id' }, { field: 'memo' }]}
      />
    </div>
  )
}

export default AgGrid
