import { useState } from 'react'
import { Container } from '@mui/material'
import './App.css'
import Header from './component/Header.tsx'
import MyButton from './components/MyButton'

const handleClick = () => {
  alert('btn clicked');
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Container>hi</Container>
      <MyButton buttonName='111111' onClick={handleClick}/>
    </>
  )
}

export default App
