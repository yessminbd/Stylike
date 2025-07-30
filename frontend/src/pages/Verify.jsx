import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {

  const [navigate, token, setCartItems, backend_url] = useContext(ShopContext)
  const [searchParams] = useSearchParams()
  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  const verifyPayment = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        backend_url + '/api/order/cerifyStripe',
        { success, orderId },
        { headers: { token } }
      )

      if (response.data.success) {
        setCartItems({})
        navigate('/orders')
      } else {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      navigate('/')
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [])

  return (
    <div className="text-center mt-20 text-xl font-semibold">
      Vérification du paiement en cours...
    </div>
  )
}

export default Verify
