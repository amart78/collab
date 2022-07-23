import './App.css';
import ProjectsPage from './components/ProjectsPage'
import TasksPage from './components/TasksPage'
import { Routes, Route, useNavigate,  } from 'react-router-dom'
import AuthNav from './components/AuthNav';

function AuthenticatedApp({ currentUser, setCurrentUser }) {
  
const navigate = useNavigate()
  
  return (
    <>
      <AuthNav setCurrentUser={setCurrentUser}/>
      <div className="App">
        <Routes>

          <Route path="/my-projects/*" element=
            {<ProjectsPage />}
          />

          <Route path="/my-tasks/*" element=
            {<TasksPage />}
          />
          
        </Routes>
      </div> 
      </>
  );
}

export default AuthenticatedApp;