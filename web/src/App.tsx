import { Provider } from 'react-redux'
import DailyReports from './components/templates/DailyReports'
import store from './redux/store'
import { Route, Routes } from 'react-router-dom'
import JSONPlaceholders from './components/templates/JSONPlaceholders'
import JSONPlaceholder from './components/templates/JSONPlaceholder'
import Root from './components'

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Root />} />
        <Route path='daily-reports' element={<DailyReports />} />
        <Route path='placeholders' element={<JSONPlaceholders />} />
        <Route
          path='placeholders/:placeholderId'
          element={<JSONPlaceholder />}
        />
      </Routes>
    </Provider>
  )
}

export default App
