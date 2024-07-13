import { useState } from 'react'
import { Container } from '@mui/material'
import './App.css'
import Header from './component/Header.tsx'
import MyButton from './components/MyButton'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VisaStatusManagement from './components/VisaStatusManagement.tsx'

const handleClick = () => {
  alert('btn clicked');
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/visa-status-management" element={<VisaStatusManagement />} />
      </Routes>
    </Router>
  )
}

export default App
