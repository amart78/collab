import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import TasksList from './TasksList'
import TaskCard from './TaskCard'

function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`/tasks`, {
        credentials: 'include'
      })
      const tasks = await res.json()
      setTasks(tasks)
    }
    const fetchProjects = async () => {
      const res = await fetch(`/projects`, {
        credentials: 'include'
      })
      const projects = await res.json()
      setProjects(projects)
    }
    fetchTasks()
    fetchProjects()
  }, [])

  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(`/tasks/${taskId}`, {
        method: "DELETE",
        credentials: 'include'
      })
      if (res.ok) {
        const updatedTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updatedTasks)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const createTask = async (formData) => {
    try {
      const res = await fetch("/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        const task = await res.json()
        setTasks(tasks => [...tasks, task])
      } else {
        const errors = await res.json()
        throw errors
      }
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={
            <TasksList
              tasks={tasks}
              projects={projects}
              deleteTask={deleteTask}
              createTask={createTask}
            />
          }
        />
        <Route path="/:id" element={
            <TaskCard
              deleteTask={deleteTask}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default TasksPage








  






// For potential future functionality to assign/unassign tasks to specific users
  
  // const assignToTask = (taskId) => {
  //   console.log(taskId)
  //   return fetch('/user_tasks', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     credentials: 'include',
  //     body: JSON.stringify({
  //       task_id: taskId
  //     })
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json()
  //       } else {
  //         return res.json().then(errors => Promise.reject(errors))
  //       }
  //     })
  //     .then(userTask => {
 
  // const updatedTasks = tasks.map((task) => {
  //   if (task.id === taskId) {
  //     return {
  //        ...task,
  //        user_task: userTask
  //         }
  //         } else {
  //           return task
  //         }
  //       })
  //       setTasks(updatedTasks)
  //     })
  //  }

    // const removeAssignmentToTask = (taskId) => {
  //   const task = tasks.find(task => task.id === taskId)
  //   return fetch(`/user_tasks/${task.user_task.id}`, {
  //     method: "DELETE",
  //     credentials: 'include'
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         const updatedTasks = tasks.map((task) => {
  //           if (task.id === taskId) {
  //             return {
  //               ...task,
  //               user_task: undefined
  //             }
  //           } else {
  //             return task
  //           }
  //         })
  //         setTasks(updatedTasks)
  //       }
  //     })
  // }