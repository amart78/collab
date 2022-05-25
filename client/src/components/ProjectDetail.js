import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

function ProjectDetail({ projectId, leaveProject, joinProject }) {
  const [project, setProject] = useState(null)

  const fetchProjectCallback = useCallback(() => {
    fetch(`/projects/${projectId}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(project => setProject(project))
  }, [projectId])
  
  useEffect(() => {
    fetchProjectCallback()
  }, [fetchProjectCallback])

  const leaveOrJoinButton = (project) => {
    if (project.user_project) {
      return (
        <button
          onClick={() => leaveProject(project.id).then(() => fetchProjectCallback())}
        >
          Leave Project
        </button>
      )
    } else {
      return (
        <button
          onClick={() => joinProject(project.id).then(() => fetchProjectCallback())}
        >
          Join Project
        </button>
      )
    }
  }

  if(project){ 
  
  return (
    <div>
      <h1>{project.name}</h1>
      {leaveOrJoinButton(project)}
      <h2>Members</h2>
      <ul>
        {project.members?.map(member => <li key={member.id}>{member.name}</li>)}
      </ul>
      <h2>Tasks</h2>
      <ul>
        {project.tasks?.map((task) => <li key={task.id}><Link to={`/my-tasks/${task.id}`}>{task.title}</Link></li>)}
      </ul>
    </div>
  )
  }
  
}

export default ProjectDetail