import React, { useState, useEffect } from 'react'
import { Routes, Route,  } from 'react-router-dom'
import TasksList from './TasksList'
import TaskDetail from './TaskDetail'

function TasksContainer() {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  
  useEffect(() => {
    fetch(`/tasks`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(tasks => setTasks(tasks))
    fetch(`/projects`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(projects => setProjects(projects))
  },[])

  const removeAssignmentToTask = (taskId) => {
    const task = tasks.find(task => task.id === taskId)
    return fetch(`/user_tasks/${task.user_task.id}`, {
      method: "DELETE",
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          // if the task is the one we just removed an assign 
          // for, set its user_task property in state to 
          // undefined; If not, leave the task as it is
          const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
              return {
                ...task,
                user_task: undefined
              }
            } else {
              return task
            }
          })
          setTasks(updatedTasks)
        }
      })
  }

  const cancelTask = (taskId) => {
    return fetch(`/tasks/${taskId}`, {
      method: "DELETE",
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          const updatedTasks = tasks.filter(task => task.id !== taskId)
          setTasks(updatedTasks)
        }
      })
  }
  const assignToTask = (taskId) => {
    taskId.preventDefault()
    console.log(taskId)
    return fetch('/user_tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        task_id: taskId
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return res.json().then(errors => Promise.reject(errors))
        }
      })
      .then(userTask => {
        // if the task is the one we just assign'd to
        // add a user_task property in state and set
        // it to the userTask; if not, leave it as is
        const updatedTasks = tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              user_task: userTask
            }
          } else {
            return task
          }
        })
        setTasks(updatedTasks)
      })
  }

  const createTask = (formData) => {
    return fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
      .then(task => {
        setTasks(tasks.concat(task))
      })
  }

  return (
      <div>
        <Routes>
          <Route
            exact path="/my-tasks/*" element=
              {<TasksList
                tasks={tasks}
                projects={projects}
                cancelTask={cancelTask}
                removeAssignmentToTask={removeAssignmentToTask}
                assignToTask={assignToTask}
                createTask={createTask}
              />}
          />
          
          <Route
            exact path="/my-tasks/:id"
            render={({ match }) => {
              return (
              <TaskDetail
                taskId={match.params.id}
                cancelTask={cancelTask}
                removeAssignmentToTask={removeAssignmentToTask}
                assignToTask={assignToTask}
              />
              )
            }}
          />

        </Routes>
      </div>
  )
}

export default TasksContainer