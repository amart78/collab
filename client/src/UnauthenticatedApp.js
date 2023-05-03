import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LandingPageNav from './components/LandingPageNav';
import Login from './components/Login';
import Signup from './components/Signup';

function UnauthenticatedApp({ setCurrentUser }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <LandingPageNav />
            <LandingPage />
          </>
        }
      />
      <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
      <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} />} />
    </Routes>
  );
}

export default UnauthenticatedApp;

