import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='Navbar'>
            <NavLink to='/' className={({ isActive }) => isActive ? "link active" : "link"}>Home </NavLink>
            <NavLink to='/posts' className={({ isActive }) => isActive ? "link active" : "link"} >Posts </NavLink>
        </div >
    )
}

export default Navbar