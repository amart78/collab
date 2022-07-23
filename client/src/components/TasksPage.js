import React, { useState, useEffect } from 'react'
import { Routes, Route,  } from 'react-router-dom'
import TasksList from './TasksList'
import TaskCard from './TaskCard'

function TasksPage() {
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
        "Content-Type": "application/json",
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
        {/* <Box sx={{ flexGrow: 1 }}>
            <Grid 
                container 
                spacing={{ xs: 2, md: 3 }} 
                columns={{ xs: 4, sm: 8, md: 12 }}
            >

            {searchResults.map( ([_, villager]) => {
            return (
                <VillagerCard key = {villager.id} villager ={villager} addFavorite= {addFavorite}/>
                )
            }) 
        }
            </Grid>
        </Box> */}

        <Routes>
          <Route
            exact path="/*" element=
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
            exact path="/:id"
            element={
              <TaskCard
                cancelTask={cancelTask}
                removeAssignmentToTask={removeAssignmentToTask}
                assignToTask={assignToTask}
              />
              }
          />

        </Routes>
      </div>
  )
}

export default TasksPage