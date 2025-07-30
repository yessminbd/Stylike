import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className='flexCenter py-2 '>
            <Link to={"/"} className='bold-24 text-xl flex absolute -top-1 left-0 ring-0 w-full flexCenter '>
                <h4 className=' text-primary flexCenter h-28 w-28 px-2 absolute -top-5 rounded-full'>Sty<span className='bg-tertiary pr-5'>like</span></h4>
            </Link>
        </header>
    )
}
