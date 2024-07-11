import { useState } from 'react'
import { Container } from '@mui/material'
import './App.css'
import Header from './component/Header.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Container>hi</Container>
    </>
  )
}

export default App
