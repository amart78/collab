import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login({ setCurrentUser }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
      .then(res => {
        if (res.ok) {
          res.json().then(user => {
            setCurrentUser(user)
            navigate('/projects')
          })
        } else {
          res.json().then(errors => {
            console.error(errors)
          })
        }
      })
      
  }

  
  return (
    <div className="authForm" 
        style={{ backgroundColor: "black", opacity: "60%", display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'
    }}>
      <form onSubmit={handleSubmit}>
        <h1 style={{ color:"white", display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          Ready to Collab?
        </h1>
        <h2 style={{color: "white", display: 'flex'}}>
         Log in:
        </h2>
        <h3 style={{color: "white", justifyContent:'center', alignItems:'center'}}>
          <label 
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="string"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </h3>
        <h3 style={{color: "white", justifyContent:'center', alignItems:'center'}}>
          <label 
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </h3>
        <p style={{ display: 'flex',  justifyContent:'center', alignItems:'center'}}><button type="submit">Log In</button></p>

        <p style={{ display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <Link to="/signup">
            Don't have an account? Sign Up
          </Link></p>
      </form>
    </div>
  )
}

export default Login