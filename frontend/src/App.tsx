// import { useState } from 'react'
import { Container } from '@mui/material'
import './App.css'
import Header from './components/Header.tsx'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './redux/store';
import VisaStatusManagement from './pages/VisaStatusManagement.tsx';
// import MyButton from './components/MyButton'

// const handleClick = () => {
//   alert('btn clicked');
// }

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <Header />
      <Container>
        <Outlet />
      </Container> */}
      <Provider store={store}>
        <Header />
        <Container>
          <Outlet />
        </Container>
    </Provider>
      {/* <MyButton buttonName='111111' onClick={handleClick}/> */}
    </>
  )
}

export default App
