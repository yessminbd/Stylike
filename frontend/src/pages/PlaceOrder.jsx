import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import Footer from '../components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [loading, setLoading] = useState(false)
  const [method, setMethod] = useState('COD')
  const { navigate, backend_url, token, setToken, cartItems, setCartItems, getCartAmount, delivery_charges, products } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let orderItems = []
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const colorQuantities = cartItems[productId][size]
          for (const color in colorQuantities) {
            const quantity = colorQuantities[color]
            if (quantity > 0) {
              const itemInfo = structuredClone(products.find(product => product._id === productId))
              if (itemInfo) {
                itemInfo.size = size
                itemInfo.color = color
                itemInfo.quantity = quantity
                orderItems.push(itemInfo)
              }
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_charges
      }
      switch (method) {
        case 'COD':
          const response = await axios.post(backend_url + '/api/order/place-order', orderData, { headers: { token } })

          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          } break;
        case 'STRIPE':
          const responseStripe = await axios.post(backend_url + '/api/order/stripe', orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)

          }
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>{loading && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="loader-spinner"></div>
      </div>
    )}
      <section>
        <div className='max-padd-container pb-36'>
          <div className='max-padd-container pt-14  rounded-2xl my-6 max-xl:mt-8' >
            <form onSubmit={onSubmitHandler} className='flex flex-col xl:flex-row gap-20 xl:gap-28'>
              <div className='flex flex-1 flex-col gap-3 text-[95%]'>
                <h3 className='h3 pb-4'>Informations de livraison</h3>
                <div className='flex gap-3'>
                  <input type='text' name='firstName' placeholder='Prénom' required className='ring-1 ring-slate-300 p-1 pl-3 rounded-sm  outline-none  bg-white h-11 w-1/2'
                    onChange={onChangeHandler}
                    value={formData.firstName}

                  />
                  <input type='text' name='lastName' placeholder='Nom' required className='ring-1 ring-slate-300 p-1 pl-3 rounded-sm  outline-none  bg-white  h-11 w-1/2'
                    onChange={onChangeHandler}
                    value={formData.lastName}
                  />
                </div>
                <input type='email' name='email' placeholder='Email' required className='ring-1 ring-slate-300 p-1 pl-3 rounded-sm  outline-none   bg-white  h-11 '
                  onChange={onChangeHandler}
                  value={formData.email}
                />
                <input type='phone' name='phone' placeholder='Numéro de téléphone' maxLength={8} required className='ring-1 ring-slate-300 p-1 pl-3 rounded-sm  outline-none  bg-white  h-11'
                  onChange={onChangeHandler}
                  value={formData.phone}
                />
                <input type='text' name='street' placeholder='Rue' required className='ring-1 ring-slate-300 p-1 pl-3 rounded-sm  outline-none  bg-white  h-11'
                  onChange={onChangeHandler}
                  value={formData.street}
                />
                <div className='flex gap-3'>
                  <input type='text' name='city' placeholder='Ville' required className='ring-1 ring-slate-300 p-1 pl-3 rounded-sm  outline-none  bg-white  h-11 w-1/2'
                    onChange={onChangeHandler}
                    value={formData.city}
                  />
                  <input type='text' name='state' placeholder='Gouvernorat' required className='ring-1 ring-slate-300 p-1 pl-3 rounded-sm  outline-none  bg-white  h-11 w-1/2'
                    onChange={onChangeHandler}
                    value={formData.state}
                  />
                </div>
                <div className='flex gap-3'>
                  <input type='text' name='zipcode' maxLength={4} placeholder='Code postal' required className='ring-1 ring-slate-300 p-1 pl-3 rounded-sm  outline-none  bg-white  h-11 w-1/2'
                    onChange={onChangeHandler}
                    value={formData.zipcode}
                  />
                  <input type='text' name='country' placeholder='Tunisie' readOnly required className='ring-1  ring-slate-300 p-1 pl-3 rounded-sm  outline-none  bg-white  h-11 w-1/2'
                    onChange={onChangeHandler}
                    value={formData.country}
                  />
                </div>
              </div>
              <div className='flex flex-1 flex-col'>
                <h3 className='h3 text-secondary'><span>Panier</span> </h3>
                <CartTotal />
                <hr className='mx-auto h-[1px] w-full bg-gray-900/10 my-1' />

                <div className='my-6'>
                  <h4 className=' h4 bold-20 mb-5'>Mode de <span className='text-secondary'>paiement</span></h4>
                  <div className='flex gap-3 '>
                    <div
                      onClick={() => setMethod('COD')}
                      className={`${method === 'COD' ? 'btn-dark  ' : 'btn-outline '} py-1   bold-16 cursor-pointer `} > Paiement à la livraison </div>
                    <div
                      onClick={() => setMethod('STRIPE')}
                      className={`${method === 'STRIPE' ? 'btn-dark   ' : 'btn-outline '} py-1  bold-16 cursor-pointer `}  > Paiement en ligne  </div>
                  </div>
                </div>
                <div className=''>
                  <button type='submit' className='btn-secondary  w-full  bold-16 '>Valider la commande</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </section>
    </>
  )
}

export default PlaceOrder