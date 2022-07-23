import React, { useState, useEffect } from 'react'
import AuthenticatedApp from './AuthenticatedApp'
import UnauthenticatedApp from './UnauthenticatedApp'

import { Route, Routes } from 'react-router-dom'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    fetch('/me', {
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          res.json().then((user) => {
            setCurrentUser(user)
            setAuthChecked(true)
          })
        } else {
          setAuthChecked(true)
        }
      })
  }, [])

 
  if(currentUser && authChecked) { 
    return(
      <div>
        <Routes>
            <Route path="*" element=
              { <AuthenticatedApp setCurrentUser={setCurrentUser} currentUser={currentUser}/> }
            />
        </Routes>
      </div>
      )
    } else {
      return (
      <div>
        <Routes>
            <Route exact path="*" element=
              {<UnauthenticatedApp setCurrentUser={setCurrentUser}/>}
            />
        </Routes>
      </div>
      )
    }
}
    export default App;
//   return (
//     <div>
//       <Routes>
//       <Route>
//         { currentUser ? (
//             <AuthenticatedApp
//               setCurrentUser={setCurrentUser}
//               currentUser={currentUser}
//             />
//           ) : (
//             <UnauthenticatedApp
//               setCurrentUser={setCurrentUser}
//             />
//           )
//         }
//       </Route>
//       </Routes>
//     </div>
//   )
// }


