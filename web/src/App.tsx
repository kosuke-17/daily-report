import { Provider } from 'react-redux'
import AgGrid from './components/AgGrid'
import store from './redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <AgGrid />
    </Provider>
  )
}

export default App
