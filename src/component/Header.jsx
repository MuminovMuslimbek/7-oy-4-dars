import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Hearder() {
    return (
        <header className='bg-blue-500 py-4 text-white select-none'>
            <div className='flex justify-between items-center mx-auto w-full max-w-[1200px]'>
                <Link to='/'>Logo</Link>
                <ul className='flex items-center gap-7'>
                    <NavLink to='/' >First Homework</NavLink>
                    <NavLink to='/second' >Second Homework</NavLink>
                    <NavLink to='/third' >Third Homework</NavLink>
                    <NavLink to='/fourth' >Fourth Homework</NavLink>
                </ul>
                <button>Log Out</button>
            </div>
        </header>
    )
}

export default Hearder