// import { useState } from 'react'
import { Container } from '@mui/material'
import './App.css'
import Header from './components/Header.tsx'
import { Outlet, useNavigate } from 'react-router-dom'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './redux/store';
import VisaStatusManagement from './pages/VisaStatusManagement.tsx';

import { JWT_KEY, API_URL } from './constants.ts';
import { useEffect } from 'react';
import { verifyToken } from './redux/userThunks.ts';
import { useDispatch } from 'react-redux';
import { UnknownAction } from '@reduxjs/toolkit';
import axios from 'axios';
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem(JWT_KEY);
    if (token) {
      dispatch(verifyToken(token) as unknown as UnknownAction);
    }
}, [dispatch]);

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
