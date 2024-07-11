import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Container } from '@mui/material'
import './App.css'
import MyButton from './components/MyButton'

const handleClick = () => {
  
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Container>hi</Container>
      <MyButton onClick={handleClick} buttonName='click me'></MyButton>
    </>
  )
}

export default App
