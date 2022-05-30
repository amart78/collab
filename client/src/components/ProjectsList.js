import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function ProjectsList({ projects, leaveProject, joinProject, createProject }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  const leaveOrJoinButton = (project) => {
    if (project.userProject) {
      return <button onClick={() => leaveProject(project.id)}>Leave Project</button>
    } else {
      return <button onClick={() => joinProject(project.id)}>Join Project</button>
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createProject({name, image})
  }
  
  return (
    <div>
      <h1>Projects</h1>
      {projects.map(project => (
        <p key={project.id}>
          <Link to={`${project.id}`}>
            {project.name}
          </Link> 
            --- {leaveOrJoinButton(project)}
        </p>
      ))}
      <h3>Add Project</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
        />
        <label htmlFor="name"> Image </label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          name="image"
        />
        {" "}<button type="submit">Add Project</button>
      </form>
    </div>
  )
}

export default ProjectsList;