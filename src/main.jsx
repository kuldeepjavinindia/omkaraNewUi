import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GlobalContextProvider from './context/GlobalContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <GlobalContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </GlobalContextProvider>  
    </Provider>

      {/* <React.StrictMode>
        
      </React.StrictMode>, */}
  </>
)
