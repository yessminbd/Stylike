import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { FaMinus, FaPlus, FaRegWindowClose } from 'react-icons/fa'
import CartTotal from '../components/CartTotal'
import Footer from '../components/Footer'

const Cart = () => {

  const { getCartCount, products, cartItems, currency, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])
  const [quantities, setQuantities] = useState({})

  useEffect(() => {
    const tempData = []
    const initialQuantities = {}
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        for (const color in cartItems[itemId][size]) {
          const quantity = cartItems[itemId][size][color]
          if (quantity > 0) {
            tempData.push({
              _id: itemId,
              size,
              color,
              quantity,
            })
            initialQuantities[`${itemId}-${size}-${color}`] = quantity
          }
        }
      }
    }
    setCartData(tempData)
    setQuantities(initialQuantities)
  }, [cartItems])

  const increment = (id, size, color) => {
    const key = `${id}-${size}-${color}`;
    const newValue = quantities[key] + 1;
    setQuantities(prev => ({ ...prev, [key]: newValue }));
    updateQuantity(id, size, color, newValue)
  }

  const decrement = (id, size, color) => {
    const key = `${id}-${size}-${color}`;
    if (quantities[key] > 1) {
      const newValue = quantities[key] - 1;
      setQuantities(prev => ({ ...prev, [key]: newValue }));
      updateQuantity(id, size, color, newValue)
    }
  }

  return (
    <section className=''>
      <div className='max-padd-container pb-36 '>
        <div className='max-padd-container pt-14 rounded-2xl my-6  max-xl:mt-8'>
          <div className='flex items-baseline gap-x-4'>
            <h3 className='h3 text-primary'>Panier </h3>
            <p className='bold-20'> {getCartCount()} {getCartCount() === 1 ? 'article' : 'articles'} </p>
          </div>
          <div className='mt-6'>
            {cartData.map((item, i) => {
              const productData = products.find(product => product._id === item._id)
              console.log('productData:', productData)
              const key = `${item._id}-${item.size}-${item.color}`
              return (
                <div key={i} className='p-1 rounded-lg'>
                  <div className='flex items-center gap-x-3'>
                    <div className='flex items-start gap-6'>
                      <img src={productData.image[0]} alt='product-image' className='w-24 sm:w-18 rounded h-24' />
                    </div>
                    <div className='flex flex-col w-full'>
                      <div className='flexBetween'>
                        <h5 className='h5 my-0 line-clamp-1'>{productData.name}</h5>
                        <FaRegWindowClose onClick={() => updateQuantity(item._id, item.size, item.color, 0)} className='text-primary cursor-pointer' />
                      </div>
                      <p className='font-bold my-0.5'>Taille : {item.size}</p>
                      <p className='font-bold my-0.5'>Couleur : {item.color}</p>
                      <div className='flexBetween'>
                        <div className='flex items-center ring-0 overflow-hidden'>
                          <button className='p1.5 text-primary rounded-full p-0.5'><FaMinus onClick={() => decrement(item._id, item.size, item.color)} className='text-xs' /></button>
                          <p className='px-2 font-bold'>{quantities[key]}</p>
                          <button className='p1.5 text-primary rounded-full p-0.5'><FaPlus onClick={() => increment(item._id, item.size, item.color)} className='text-xs' /></button>
                        </div>
                        <h5 className='h5 text-gray-30'>{productData.price} {currency}</h5>
                      </div>
                    </div>
                  </div>
                  <hr className='mx-auto h-[1px] w-4/5 mt-2 mb-10' />
                </div>
              )
            })}
          </div>
          <div className='flex my-20'>
            <div className='w-full '>
              <CartTotal />
              <button onClick={() => navigate('/place-order')} className='btn-dark mt-7'>Procéder au paiement</button>
              <button onClick={() => navigate('/collection')} className='btn-secondary mt-7 mx-3'>Continuer mes achats</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section >
  )
}

export default Cart
