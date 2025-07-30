import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaListAlt, FaPlus } from "react-icons/fa"
import { MdFactCheck, MdLogout, } from "react-icons/md"


export default function Sidebar({ token, setToken }) {

    return (
        <div className='max-sm:flexCenter max-xs:pb-3  rounded-xl  mb-3 sm:w-1/5 sm:min-h-screen  pl-8 lg:pl-12 sm:pr-3   '>
            <div className='flex max-sm:items-center sm:flex-col pt-5 '>
                <div className=' flex sm:flex-col gap-x-5 gap-y-8 sm:pt-10'>

                    <NavLink to="/"
                        className={({ isActive }) => isActive ? 'active-link bold-16 flexStart ' : 'flexStart gap-x-2 bold-15 text-primary cursor-pointer max-w-64 h-10 rounded-xl '}>
                        <FaPlus />
                        <div className=' hidden lg:flex pl-2'>Ajouter un produit</div>
                    </NavLink>

                    <NavLink to="/list"
                        className={({ isActive }) => isActive ? 'active-link bold-16 flexStart  ' : 'flexStart gap-x-2 bold-15 text-primary cursor-pointer max-w-64 h-10 rounded-xl '}>
                        <FaListAlt />
                        <div className=' hidden lg:flex pl-2'>Liste des produits</div>
                    </NavLink>

                    <NavLink to="/orders"
                        className={({ isActive }) => isActive ? 'active-link bold-16 flexStart ' : 'flexStart gap-x-2  bold-15 text-primary cursor-pointer max-w-64 h-10 rounded-xl '}>
                        <MdFactCheck size={14} />
                        <div className='hidden lg:flex pl-2'>Liste des commandes</div>
                    </NavLink>
                </div>
                <div className=
                    'max-sm:ml-5 sm:mt-96 '>
                    {token && (
                        <button onClick={() => setToken("")} className='flexStart gap-x-2 bold-15 text-primary cursor-pointer '>
                            <MdLogout />
                            <div className='hidden lg:flex'>Se déconnecter</div>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
