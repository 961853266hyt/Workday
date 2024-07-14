// import { useState } from 'react'
import { Container } from '@mui/material'
import './App.css'
import Header from './components/Header.tsx'
import { Outlet } from 'react-router-dom'
// import MyButton from './components/MyButton'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VisaStatusManagement from './components/VisaStatusManagement.tsx'

// const handleClick = () => {
//   alert('btn clicked');
// }

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <Header />
      <Container>
        <Outlet />
      </Container>
      {/* <MyButton buttonName='111111' onClick={handleClick}/> */}
    </>
  )
}

export default App
