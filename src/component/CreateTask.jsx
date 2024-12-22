import React, { useContext, useState } from 'react'
import { Tasks } from '../App'
import toast from 'react-hot-toast'

function CreateTask() {
    const { setTasks } = useContext(Tasks)
    const [task, setTask] = useState({
        id: '',
        name: '',
        status: 'todo'
    })

    function handleSubmit(event) {
        event.preventDefault()

        if (task.name.length < 3) return toast.error('A task must have more than 3 characters!!', { icon: '😈' })
        if (task.name.length > 100) return toast.error('A task must not be more than 100 characters!!', { icon: '😈' }  )

        setTasks((prev) => {
            const list = [...prev, task]
            localStorage.setItem('tasks', JSON.stringify(list || []))
            return list
        })

        toast.success('Task Created!!')

        setTask({
            id: '',
            name: '',
            status: 'todo'
        })
    }

    return (
        <form onSubmit={handleSubmit} className='flex justify-center items-center border-gray-200 py-[60px] border-b select-none'>
            <input value={task.name} onChange={(e) => setTask({ ...task, id: Date.now(), name: e.target.value })} className='p-2 border rounded-md w-full max-w-[400px]' type="text" placeholder='Enter your task..' />
            <button type='submit' className='bg-blue-600 px-4 py-2 rounded-md text-white transition-[0.3s] active:scale-95'>+Add Task</button>
        </form>
    )
}

export default CreateTask