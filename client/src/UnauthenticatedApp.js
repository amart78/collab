import React from 'react'
import { Routes, Route, Router } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LandingPageNav from './components/LandingPageNav'
import Login from './components/Login'
import Signup from './components/Signup'

function UnauthenticatedApp({ setCurrentUser }) {

  return (
    <>
      <LandingPageNav />
      <LandingPage />
     
       <Routes>

        <Route exact path="/login/*" element=
          {<Login setCurrentUser={setCurrentUser}/>}
        />

        <Route exact path="/signup/*" element=
          {<Signup setCurrentUser={setCurrentUser}/>}/
        >
      </Routes> 
      </>
  )
}


export default UnauthenticatedApp;