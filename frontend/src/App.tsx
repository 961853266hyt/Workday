// import { useState } from 'react'
import { Container } from '@mui/material'
import './App.css'
import Header from './components/Header.tsx'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './redux/store';
import VisaStatusManagement from './pages/VisaStatusManagement.tsx';


function App() {

  return (
    <>
        <Header />
        <Container>
          <Outlet />
        </Container>
    </>
  )
}

export default App
