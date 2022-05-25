import './App.css';
import ProjectsContainer from './components/ProjectsContainer'
import TasksContainer from './components/TasksContainer'
import { Routes, Route, NavLink, useNavigate,  } from 'react-router-dom'

function AuthenticatedApp({ currentUser, setCurrentUser }) {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    fetch(`/logout`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          setCurrentUser(null)
          navigate('/')
        }
      })
  }
  return (
      <div className="App">
        <nav>
          <span>
            <NavLink to="/my-projects">Projects</NavLink>{" - "}
            <NavLink to="/my-tasks">Tasks</NavLink>
          </span>
          <span>Logged in as {currentUser.name} <button onClick={handleLogout}>Logout</button></span>
        </nav>
        <ProjectsContainer />
        <TasksContainer />

        <Routes>

          <Route path="/my-projects/*" element=
            {<ProjectsContainer />}
          />

          <Route path="/my-tasks/*" element=
            {<TasksContainer />}
          />
          
        </Routes>
      </div> 
  );
}

export default AuthenticatedApp;