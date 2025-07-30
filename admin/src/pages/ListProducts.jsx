import React, { useEffect, useState } from 'react'
import { backend_url } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import { TbTrash } from 'react-icons/tb'
import { FaCheck } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'


export default function ListProducts({ token }) {
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const currency = "TND"

  const fetchList = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list")
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backend_url + '/api/product/remove', { id }, { headers: { token } })
      setLoading(true)
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()

      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)

    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchList()
  })

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="loader-spinner"></div>
        </div>
      )}

      <div className='pl-8  sm:pt-14'>
        <h4 className='h4'>Liste des produits</h4>
        <div className='flex flex-col gap-2 pt-4'>
          <div className='hidden md:grid grid-cols-[2fr_3fr_2fr_3fr_2fr_1fr] items-center  px-4 text-primary  bg-tertiary bold-14 sm:bold-16 rounded-md py-3 '>
            <h5 >Image</h5>
            <h5>Nom</h5>
            <h5 >Catégorie</h5>
            <h5>Prix</h5>
            <h5>Populaire</h5>
            <h5>Supprimer</h5>
          </div>
          {list.map((item) => (
            <div key={item._id}>
              <div className='grid grid-cols-4 md:grid-cols-[2fr_3fr_2fr_3fr_2fr_1fr] items-center gap-2 py-2 px-4'>
                <img src={item.image[0]} className='w-16 h-16 rounded-md' />
                <h5 className='text-[13px] font-semibold'>{item.name}</h5>
                <p className='hidden md:block text-[13px] font-semibold'>{item.category}</p>
                <div className='text-sm font-semibold'>{item.price} {currency}</div>
                <div className='hidden md:block text-sm font-semibold'>
                  {item.popular === true
                    ? <FaCheck className='text-green-600' />
                    : <MdClose className='text-red-600' />
                  }
                </div>
                <div className='text-right md:text-center text-lg cursor-pointer'>
                  <TbTrash onClick={() => removeProduct(item._id)} />
                </div>
              </div>
              <hr className="border-tertiary my-2" />
            </div>
          ))}
        </div>
      </div> </>
  )
}
