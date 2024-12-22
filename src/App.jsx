import React, { createContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import FirstHom from './pages/FirstHom'
import Header from './component/Header'
import SecondHom from './pages/SecondHom'
import ThirdHom from './pages/ThirdHom'
import FourthHom from './pages/FourthHom'

export const Tasks = createContext(null)

function App() {
  const [tasks, setTasks] = useState([])

  return (
    <div>
      <Header />
      <Tasks.Provider value={{ tasks, setTasks }}>
        <Routes>
          <Route path='/' element={<FirstHom />} />
          <Route path='/second' element={<SecondHom />} />
          <Route path='/third' element={<ThirdHom />} />
          <Route path='/fourth' element={<FourthHom />} />
        </Routes>
      </Tasks.Provider>
    </div>
  )
}

export default App