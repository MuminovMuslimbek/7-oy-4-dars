import React, { useContext, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Tasks } from '../App'
import CreateTask from '../component/CreateTask'
import ListTasks from '../component/ListTasks'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function FirstHom() {
  const { setTasks } = useContext(Tasks)

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(savedTasks || [])
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className='flex flex-col gap-[60px] mx-auto w-full max-w-[1200px]'>
        <CreateTask />
        <ListTasks />
      </div>
    </DndProvider>
  )
}

export default FirstHom