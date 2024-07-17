import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import { CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import TestTheme from './components/TextTheme.tsx'
import VisaStatusManagement from './pages/VisaStatusManagement.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<App />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="test-theme" element={<TestTheme />} />
            <Route path="visa-status" element={<VisaStatusManagement />} />
          </Route> */}
          <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>}>
              <Route path="test-theme" element={<TestTheme />} />
              <Route path="visa-status" element={<VisaStatusManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
