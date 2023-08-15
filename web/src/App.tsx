import { AgGridReact } from 'ag-grid-react'

const App = () => {
  return (
    <div className='ag-theme-alpine' style={{ height: 400, width: 600 }}>
      <AgGridReact
        rowData={[
          { make: 'Toyota', model: 'Celica', price: 35000 },
          { make: 'Ford', model: 'Mondeo', price: 32000 },
          { make: 'Porsche', model: 'Boxster', price: 72000 },
        ]}
        columnDefs={[{ field: 'make' }, { field: 'model' }, { field: 'price' }]}
      />
    </div>
  )
}

export default App
