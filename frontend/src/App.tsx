// import { useState } from 'react'
import { Container } from '@mui/material'
import './App.css'
import Header from './components/Header.tsx'
import { Outlet } from 'react-router-dom'
// import MyButton from './components/MyButton'

// const handleClick = () => {
//   alert('btn clicked');
// }

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      {/* <MyButton buttonName='111111' onClick={handleClick}/> */}
    </>
  )
}

export default App
