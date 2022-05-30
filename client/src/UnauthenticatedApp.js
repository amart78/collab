import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'

function UnauthenticatedApp({ setCurrentUser }) {

  return (
  
      <Routes>

        <Route exact path="/" element=
          {<Login setCurrentUser={setCurrentUser}/>}
        />

        <Route exact path="/signup/*" element=
          {<Signup setCurrentUser={setCurrentUser}/>}/
        >
      </Routes>
 
  )
}


export default UnauthenticatedApp