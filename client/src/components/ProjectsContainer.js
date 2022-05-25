import React, { useState, useEffect } from 'react'
import { Routes, Route,  } from 'react-router-dom'
import ProjectsList from './ProjectsList'
import ProjectDetail from './ProjectDetail'

function ProjectsContainer() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/projects", {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(projects => setProjects(projects))
  }, [])


  const leaveProject = (projectId) => {
    let userProjectId = projects.find(project => project.id === projectId).user_project.id
    return fetch(`/user_projects/${userProjectId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          const updatedProjects = projects.map(project => {
            if (project.id === projectId) {
              return {
                ...project,
                user_project: undefined
              }
            } else {
              return project
            }
          })
          setProjects(updatedProjects)
        }
      })
  }

  const joinProject = (projectId) => {
    return fetch('/user_projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        project_id: projectId
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return res.json().then(errors => Promise.reject(errors))
        }
      })
      .then(userProject => {
        const updatedProjects = projects.map(project => {
          if (project.id === projectId) {
            return {
              ...project,
              user_project: userProject
            }
          } else {
            return project
          }
        })
        setProjects(updatedProjects)
      })
  }

  const createProject = (formData) => {
    return fetch("/projects", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return res.json().then(errors => Promise.reject(errors))
        }
      })
      .then(project => {
        setProjects(projects.concat(project))
      })
  }

  return (
      <div>
        <Routes>
          
          <Route
            exact path="/my-projects/*" element={
        
              <ProjectsList
                projects={projects}
                leaveProject={leaveProject}
                joinProject={joinProject}
                createProject={createProject}
              />
            }
          />

          <Route
            exact path="/my-projects/:id"
            render={({ match }) => {
              return (
                
                <ProjectDetail
                  projectId={match.params.id}
                  leaveProject={leaveProject}
                  joinProject={joinProject}
                />
              )
            }}
          />

        </Routes>
      </div>
  )
}

export default ProjectsContainer