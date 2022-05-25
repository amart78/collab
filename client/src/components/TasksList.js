import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function TasksList({ tasks, projects, removeAssignmentToTask, cancelTask, assignToTask, createTask }) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [projectName, setProjectName] = useState('')


  const assignOrCancelButton = (task) => {
    if (task.user_task) {
      return <button onClick={() => removeAssignmentToTask(task.id)}> Unassign </button>
    } else {
      return <button onClick={() => assignToTask(task.id)}> Assign </button>
    }
  }

  const cancelTaskButton = (task) => {
    if (task.user_is_creator) {
      return <button onClick={() => cancelTask(task.id)}>Cancel Task</button>
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createTask({
      title,
      description,
      dueDate,
      project_name: projectName
    })
    setTitle('')
    setDescription('')
    setDueDate('')
    setProjectName('')
  }
  
  return (
    <div>
      <h1>Tasks</h1>
      {tasks.map(task => (
        <p key={task.id}>
          <Link to={`my-tasks/${task.id}`}>
            {task.title}
          </Link> 
            --- {assignOrCancelButton(task)} {task.user_is_creator && '--- '} {cancelTaskButton(task)}
        </p>
      ))}
      <h3>Add Task</h3>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
          />
        </p>
        <p>
          <label htmlFor="description"> Description </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
          />
        </p>
        <p>
          <label htmlFor="due_date"> Due Date </label>
          <input
            type="text"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            name="due_date"
          />
        </p>
        <p>
          <label htmlFor="project_name">Project Name </label>
          <input
            type="text"
            name="project_name"
            value={projectName}
            list="projects"
            onChange={(e) => setProjectName(e.target.value)}
          />
          <datalist id="projects">
            {projects.map(project => <option>{project.name}</option>)}
          </datalist>
        </p>
        {" "}<button type="submit">Add Task</button>
      </form>
    </div>
  )
}

export default TasksList