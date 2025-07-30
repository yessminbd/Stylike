import React from 'react';
import { FaLayerGroup, FaRegWindowClose } from 'react-icons/fa';
import { HiHome, HiInformationCircle } from "react-icons/hi";
import { MdMail } from "react-icons/md";
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ menuIsOpen, containerStyles, toggleMenu }) => {

  const navItems = [
    { to: '/', label: 'Accueil', icon: <HiHome size={15} /> },
    { to: '/collection', label: 'Collection', icon: <FaLayerGroup size={12} /> },
    { to: '/about', label: 'À propos', icon: <HiInformationCircle size={16} /> },
    { to: '/contact', label: 'Contact', icon: <MdMail size={14} /> },
  ]


  return (
    <nav className={containerStyles}>
      {menuIsOpen && (
        <>
          <FaRegWindowClose onClick={toggleMenu} className='text-xl self-end cursor-pointer text-primary relative left-8' />
          <Link to={'/'} className='bold-24 '>
            <h4 className=' text-primary flexCenter h-28 w-28   absolute -top-7 rounded-full text-xl '>Sty<span className='bg-tertiary pr-5'>like</span></h4>
          </Link>
        </>
      )}
      {navItems.map(({ to, label, icon }) => (
        <div key={label} className='inline-flex'>
          <NavLink to={to}
            className={({ isActive }) => isActive ? 'active-link flexCenter gap-x-2 ' : 'flexCenter gap-x-2'}
            onClick={menuIsOpen && toggleMenu}
          >
            {icon}  <h5 className='bold-16 '> {label}</h5>
          </NavLink>
        </div>
      ))
      }
    </nav >
  )
}

export default Navbar