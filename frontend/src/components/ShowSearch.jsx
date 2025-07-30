import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router'

const ShowSearch = () => {

  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [location])

  return showSearch && visible ? (
    <section className='py-4 gap-7'>
      <div className='text-center bg-primaryLight '>
        <div className='inline-flex items-center justify-center ring-1 border border-primary ring-primary py-1.5 px-3 rounded-lg bg-primaryLight overflow-hidden'>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Recherchez ici ...' className='border-none outline-none w-full bg-primaryLight text-sm' />
          <div><FaSearch />
          </div>
        </div>
      </div>
    </section>
  ) : null
}

export default ShowSearch