import React, { useState, useEffect } from 'react'
import {useParams, Routes, Route,  } from 'react-router-dom'
import ProjectsList from './ProjectsList'
import ProjectCard from './ProjectCard'

function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/projects", {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(projects => setProjects(projects))
  }, [])


  const leaveProject = (projectId) => {
    return fetch(`/user_projects/${projectId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          const updatedProjects = projects.filter(project => {
            return project.id !== projectId;
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
          <Route path="/" element={
        
              <ProjectsList
                projects={projects}
                leaveProject={leaveProject}
                joinProject={joinProject}
                createProject={createProject}
              />
            }
          />

          <Route
            path=":projectId"
            element={
                <ProjectCard
                  leaveProject={leaveProject}
                  joinProject={joinProject}
                />
            }
          />

        </Routes>
      </div>
  )
}

export default ProjectsPage