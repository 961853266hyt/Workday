import { useState } from 'react'
import { Container } from '@mui/material'
import './App.css'
import MyButton from './components/MyButton'

const handleClick = () => {
  alert('btn clicked');
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Container>hi</Container>
      <MyButton buttonName='111111' onClick={handleClick}/>
    </>
  )
}

export default App
