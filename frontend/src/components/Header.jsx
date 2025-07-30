import React, { useContext, useState } from 'react'
import { FaBars, FaSearch, FaShoppingBag, FaUserCircle } from "react-icons/fa"
import { TbArrowNarrowRight } from "react-icons/tb"
import { Link, useNavigate } from "react-router-dom"
import Navbar from './Navbar'
import { ShopContext } from '../context/ShopContext'
import { Button, Menu, MenuItem } from '@mui/material'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'

const Header = () => {
  const { setShowSearch, getCartCount, navigate, token, setToken } = useContext(ShopContext)
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const toggleMenu = () => {
    setMenuIsOpen((prev) => !prev)
  }
  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    // setCartItem({});
    navigate('/login')
  }

  return (
    <header className='py-5 w-full bg-primaryLight shadow-md '>
      <div className='max-padd-container flexBetween'>
        <Link to={"/"} className='bold-24 text-xl flex-1 xl:hidden'>
          <h4 className=' text-primary flexCenter h-28 w-28 px-2 absolute -top-5 rounded-full'>Sty<span className='bg-tertiary pr-5'>like</span></h4>
        </Link>
        <div className='flex-1'>
          <Navbar menuIsOpen={menuIsOpen} toggleMenu={toggleMenu} containerStyles={`${menuIsOpen ? "flex flex-col gap-y-12 h-screen w-[222px] absolute left-0 top-2 bg-primaryLight z-50 px-10 py-2 shadow-md  " : " hidden xl:flex gap-x-5 xl:gap-x-8 medium-15  px-2 py-1 "}"`}
          />
        </div>
        <Link to={"/"} className='bold-28 text-xl flex-1 hidden xl:flex'>
          <h4 className=' text-primary flexCenter h-28 w-28 px-2 absolute -top-5 rounded-full'>Sty<span className='bg-tertiary pr-5'>like</span></h4>
        </Link>
        <div className='flexBetween gap-x-2 xs:gap-x-7'>
          {!menuIsOpen && (
            <FaBars onClick={toggleMenu} className='xl:hidden cursor-pointer text-xl ' />
          )}
          <div>
            <FaSearch onClick={() => setShowSearch((prev) => !prev)} className='text-xl cursor-pointer' />
          </div>
          <Link to={"/cart"} className='flex relative'>
            <FaShoppingBag className='text-[16px]' />
            <span className='bg-red-500 text-white medium-16 absolute -right-2 -top-2 flexCenter w-4 h-4 rounded-full shadow-inner text-xs'>{getCartCount()}</span>
          </Link>
          <div className='relative group'>
            <div onClick={() => !token && navigate('/login')}>
              <FaUserCircle className='text-xl cursor-pointer' />
            </div>
            {token && <>
              <ul className="bg-primaryLight shadow-md p-3 ring-1 ring-gray-200 rounded  top-10 right-3 w-44 hidden group-hover:flex flex-col z-50 fixed">
                <li className='flexBetween cursor-pointer' onClick={() => navigate("/orders")}>
                  <p className='text-primary font-semibold text-base'>Commandes</p>
                </li>
                <hr className='my-2' />
                <li className='flexBetween cursor-pointer' onClick={logout} >
                  <p className='text-primary font-semibold text-base'>Se déconnecter</p>
                </li>
              </ul>
            </>}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header