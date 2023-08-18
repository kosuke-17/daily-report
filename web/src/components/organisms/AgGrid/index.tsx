import Box from '@mui/material/Box'
import { AgGridReact, AgGridReactProps } from 'ag-grid-react'
import { SxProps } from '@mui/system'

type AgGridProps = {
  agGridReactProps: AgGridReactProps
  agGridSx?: SxProps
}

const AgGrid = (props: AgGridProps) => {
  const { agGridReactProps, agGridSx = { height: 600, width: 600 } } = props
  return (
    <Box className='ag-theme-alpine' sx={agGridSx}>
      <AgGridReact {...agGridReactProps} />
    </Box>
  )
}

export default AgGrid
