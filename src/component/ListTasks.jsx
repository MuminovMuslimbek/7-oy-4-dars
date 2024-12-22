import React, { useContext, useEffect, useState } from 'react'
import { Tasks } from '../App'
import toast from 'react-hot-toast'
import { useDrag, useDrop } from 'react-dnd'

function ListTasks() {
    const { tasks, setTasks } = useContext(Tasks)

    const [todos, setTodos] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [closed, setClosed] = useState([])

    useEffect(() => {
        const fTodos = tasks.filter(task => task.status == 'todo')
        const fInProgress = tasks.filter(task => task.status == 'inProgress')
        const fClosed = tasks.filter(task => task.status == 'closed')

        setTodos(fTodos)
        setInProgress(fInProgress)
        setClosed(fClosed)
    }, [tasks])

    const statuses = ['todo', 'inProgress', 'closed']

    return (
        <div className='flex justify-between mx-auto mb-10 w-full max-w-[1000px] select-none'>
            {statuses.map((status, index) => (
                <Section key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} closed={closed} />
            ))}
        </div>
    )
}

export default ListTasks

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item) => addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    let text = 'Todo'
    let bg = 'bg-slate-500'
    let tasksToMap = todos

    if (status === 'inProgress') {
        text = 'In Progress'
        bg = 'bg-purple-500'
        tasksToMap = inProgress
    }

    if (status === 'closed') {
        text = 'Closed'
        bg = 'bg-green-500'
        tasksToMap = closed
    }

    function addItemToSection(id) {
        setTasks(prev => {
            const mTasks = prev.map(t => {
                if (t.id == id) {
                    return { ...t, status: status }
                }
                return t
            })
            localStorage.setItem('tasks', JSON.stringify(mTasks))
            toast('Task status changed', { icon: "😯" })
            return mTasks
        })
    }

    return (
        <div ref={drop} className={`w-64 ${isOver ? 'bg-slate-200' : ''} rounded-md p-2 h-full flex flex-col justify-between gap-[20px]`}>
            <Header text={text} bg={bg} count={tasksToMap.length} />
            {tasksToMap.length > 0 && tasksToMap.map((task, index) => <Task key={index} id={task.id} task={task} tasks={tasks} setTasks={setTasks} />)}
        </div>
    )
}

const Header = ({ text, bg, count }) => {
    return (
        <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
            {text}
            <p className='flex justify-center items-center bg-white ml-2 rounded-full w-5 h-5 text-black'>{count}</p>
        </div>
    )
}

const Task = ({ task, tasks, setTasks, id }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    function handleRemove(id) {
        const fTasks = tasks.filter(t => t.id !== id)
        localStorage.setItem('tasks', JSON.stringify(fTasks))
        setTasks(fTasks)
        toast('Task removed', { icon: '☠️' })
    }

    return (
        <div ref={drag} className={`relative p-4 shadow-md ${isDragging ? 'opacity-25' : 'opacity-100'} rounded-md cursor-grab active:cursor-grabbing`}>
            <p>{task.name}</p>
            <button onClick={() => handleRemove(task.id)} className='right-1 bottom-1 absolute text-slate-400'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
        </div>
    )
}